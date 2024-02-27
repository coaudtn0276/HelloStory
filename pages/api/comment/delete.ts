import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (...[req, res]: ServerPropsType) => {
  try {
    if (req.method === "DELETE") {
      const session = await getServerSession(req, res, authOptions);

      const reqData = JSON.parse(req.body);
      const { postId } = reqData;
      // console.log("postId", postId);

      const db = (await connectDB).db("hellostory");
      const user = await db.collection("comment").findOne({ _id: new ObjectId(reqData.itemId) });
      // console.log(user);

      const pwcheck = await bcrypt.compare(reqData.commentPw.toString(), user?.password.toString());
      // console.log(pwcheck);

      if (pwcheck === false) {
        return res.status(403).json("비밀번호 틀림");
      }

      if (pwcheck || session.user.role === "admin") {
        await db.collection("comment").deleteOne({ _id: new ObjectId(reqData.itemId) });

        // 삭제할때 parent를 가지고있는 documnet도 삭제 해야함.
        await db.collection("comment").deleteMany({ parent: new ObjectId(reqData.itemId) });

        let result;
        const findParentLength = await db
          .collection("comment")
          .find({
            $or: [{ parent: new ObjectId(postId) }, { grandParentId: new ObjectId(postId) }],
          })
          .toArray();

        result = findParentLength.length;

        let findPost = await db.collection("post").findOne({ _id: new ObjectId(postId) });
        if (findPost !== null) {
          findPost.commentNum = result;
          await db.collection("post").updateOne({ _id: new ObjectId(postId) }, { $set: findPost });
        }

        return res.status(200).json("삭제 완료");
      }
    }
  } catch (error) {
    return res.status(500).json("DB에러");
  }
};

export default handler;
