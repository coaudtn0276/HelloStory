import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "POST") {
    if (JSON.parse(req.body).title === "" || JSON.parse(req.body).content === "") {
      return res.status(500).json("제목과 내용 빈칸");
    }
    try {
      const reqData = JSON.parse(req.body);
      const now = new Date();
      const session = await getServerSession(req, res, authOptions);
      // console.log(session);

      now.setHours(now.getHours() + 9);
      reqData.modificationDate = now.toISOString();
      reqData.author = session.user.name;

      // console.log(reqData);
      const db = (await connectDB).db("hellostory");
      const result = db.collection("post").insertOne(reqData);
      return res.status(200).json("ok");
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }

    // return res.status(200);
  }
};

export default handler;
