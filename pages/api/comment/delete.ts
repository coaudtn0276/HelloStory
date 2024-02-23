import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

import bcrypt from "bcrypt";

const handler = async (...[req, res]: ServerPropsType) => {
  try {
    if (req.method === "DELETE") {
      const reqData = JSON.parse(req.body);

      const db = (await connectDB).db("hellostory");
      const user = await db.collection("comment").findOne({ _id: new ObjectId(reqData.itemId) });
      //   console.log(user);

      const pwcheck = await bcrypt.compare(reqData.commentPw.toString(), user?.password.toString());
      if (!pwcheck) {
        return res.status(403).json("비밀번호 틀림");
      }

      await db.collection("comment").deleteOne({ _id: new ObjectId(reqData.itemId) });

      // 삭제할때 parent를 가지고있는 documnet도 삭제 해야함. - 추후 다시 기능구현
      //   await db.collection("comment").deleteMany({ parent: reqData.itemId });

      return res.status(200).json("삭제 완료");
    }
  } catch (error) {
    return res.status(500).json("DB에러");
  }
};

export default handler;

// parent : 65d82aae3399d487c4c21b1c

//grand parent : 65cc6e9c7f6dbef51317bc07
