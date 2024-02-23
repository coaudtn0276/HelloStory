import { ServerPropsType } from "@/src/type/types";

import { connectDB } from "@/src/util/database";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

const handler = async (...[req, res]: ServerPropsType) => {
  try {
    if (req.method === "POST") {
      const reqData = JSON.parse(req.body);
      const { commentValue } = reqData;
      const session = await getServerSession(req, res, authOptions);
      //   console.log(session);

      if (commentValue.author === "") {
        return res.status(400).json("닉네임 공백");
      }
      if (commentValue.password === "") {
        return res.status(400).json("비밀번호 공백");
      }
      if (commentValue.comment === "") {
        return res.status(400).json("댓글 공백");
      }
      if (session) {
        commentValue.author = session.user.name;
      }
      const now = new Date();
      now.setHours(now.getHours() + 9);

      let hash = await bcrypt.hash(commentValue.password, 10);

      commentValue.modificationDate = now.toISOString();
      commentValue.parent = new ObjectId(reqData.itmeId);
      commentValue.password = hash;

      console.log(commentValue);

      const db = (await connectDB).db("hellostory");
      const result = db.collection("comment").insertOne(commentValue);
      return res.status(200).json(commentValue);
    }
  } catch (error) {
    return res.status(500).json({ error: "mongoDB 오류" });
  }
};
export default handler;
