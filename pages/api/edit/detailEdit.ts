import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (...[req, res]: ServerPropsType) => {
  let reqData = JSON.parse(req.body);
  let { _id, content } = reqData;

  const db = (await connectDB).db("hellostory");
  const result = await db.collection("post").findOne({ _id: new ObjectId(_id) });

  const session = await getServerSession(req, res, authOptions);

  // console.log("findData", result);
  if (req.method === "PUT") {
    if (content === result?.content) {
      return res.status(400).json("내용수정이 없습니다.");
    }

    try {
      if (result?.author === session.user.name || session.user.role === "admin") {
        const now = new Date();
        now.setHours(now.getHours() + 9);

        const { _id: _, ...updateData } = reqData;

        updateData.modificationDate = now.toISOString();
        console.log(updateData);

        await db.collection("post").updateOne({ _id: new ObjectId(_id) }, { $set: updateData });

        return res.status(200).json("ok");
      } else {
        return res.status(403).json("접근 권한 없음.");
      }
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }
  }
};

export default handler;
