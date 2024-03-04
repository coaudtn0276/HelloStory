import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);

      const db = (await connectDB).db("hellostory");
      const findItme = await db.collection("post").findOne({ _id: new ObjectId(req.body.toString()) });
      // if (findItme?.author !== session.user.name) {
      //   return res.status(403).json("접근 권한 없음");
      // }

      // console.log(session);

      if (findItme?.author === session.user.name || session.user.role === "admin") {
        const result = await db.collection("post").deleteOne({ _id: new ObjectId(req.body.toString()) });
        await db.collection("comment").deleteMany({
          $or: [{ parent: new ObjectId(req.body.toString()) }, { grandParentId: new ObjectId(req.body.toString()) }],
        });

        return res.status(200).json("success");
      } else {
        return res.status(403).json("접근 권한 없음");
      }
    } catch (error) {
      return res.status(500).json("DB에러");
    }
  }
};

export default handler;
