import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "GET") {
    try {
      const itemId = req.query.itemId;
      // console.log(itemId?.toString());
      // return res.status(200).json("요청성공");

      const db = (await connectDB).db("hellostory");
      const result = await db.collection("post").findOne({ _id: new ObjectId(itemId?.toString()) });

      return res.status(200).json(JSON.stringify(result));
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }
  }
};

export default handler;
