import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("hellostory");
      const result = db.collection("post").deleteOne({ _id: new ObjectId(req.body) });
      return res.status(200).json("success");
    } catch (error) {
      return res.status(500).json("DB에러");
    }
  }
};

export default handler;
