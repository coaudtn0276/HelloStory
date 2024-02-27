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
      const { itemId } = reqData;
      const session = await getServerSession(req, res, authOptions);

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
      commentValue.parent = new ObjectId(itemId);
      commentValue.password = hash;
      if (reqData.grandParentId) {
        commentValue.grandParentId = new ObjectId(reqData.grandParentId);
      }

      // console.log("reqData", reqData);
      // console.log("itemid", itemId);
      // console.log("commentValue", commentValue);

      const db = (await connectDB).db("hellostory");

      // 서버에 데이터 추가
      const newData = await db.collection("comment").insertOne(commentValue);

      let result;
      if (reqData.grandParentId) {
        const findParentLength = await db
          .collection("comment")
          .find({
            $or: [{ parent: new ObjectId(reqData.grandParentId) }, { grandParentId: new ObjectId(reqData.grandParentId) }],
          })
          .toArray();

        result = findParentLength.length;

        let findPost = await db.collection("post").findOne({ _id: new ObjectId(reqData.grandParentId) });
        if (findPost !== null) {
          findPost.commentNum = result;
          await db.collection("post").updateOne({ _id: new ObjectId(reqData.grandParentId) }, { $set: findPost });
        }
      } else {
        const findParentLength = await db
          .collection("comment")
          .find({
            $or: [{ parent: new ObjectId(itemId) }, { grandParentId: new ObjectId(itemId) }],
          })
          .toArray();

        result = findParentLength.length;

        let findPost = await db.collection("post").findOne({ _id: new ObjectId(itemId) });
        if (findPost !== null) {
          findPost.commentNum = result;
          await db.collection("post").updateOne({ _id: new ObjectId(itemId) }, { $set: findPost });
        }
      }

      return res.status(200).json(commentValue);
    }
  } catch (error) {
    return res.status(500).json({ error: "mongoDB 오류" });
  }
};
export default handler;
