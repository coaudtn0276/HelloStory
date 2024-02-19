import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import bcrypt from "bcrypt";

const handler = async (...[req, res]: ServerPropsType) => {
  try {
    if (req.method === "POST") {
      const reqData = JSON.parse(req.body);

      const db = (await connectDB).db("hellostory");
      const findName = await db.collection("user_cred").findOne({ name: reqData.name });
      const findEmail = await db.collection("user_cred").findOne({ email: reqData.email });
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

      if (reqData.name === "") {
        return res.status(500).json("이름 빈칸");
      }
      if (reqData.email === "" || !emailRegex.test(reqData.email)) {
        return res.status(500).json("유효한 이메일이 아님");
      }
      if (reqData.password === "") {
        return res.status(500).json("비밀번호 빈칸");
      }
      if (reqData.password !== reqData.checkPassword) {
        return res.status(500).json("비밀번호가 일치하지 않음");
      }
      if (findName) {
        return res.status(408).json("이름 중복");
      }
      if (findEmail) {
        return res.status(409).json("메일이 중복");
      }

      let hash = await bcrypt.hash(reqData.password, 10);
      reqData.password = hash;

      const { checkPassword, ...restData } = reqData;

      await db.collection("user_cred").insertOne(restData);
      return res.status(200).json("가입 성공");
    }
  } catch (error) {
    return res.status(500).json({ error: "mongoDB 오류" });
  }
};

export default handler;

// 이름, 이메일, 비밀번호 빈칸일 경우 status500,
// 이름, 이메일 중복 확인
