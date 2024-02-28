import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "GET") {
    try {
      const itemId = req.query.itemId;

      const db = (await connectDB).db("hellostory");
      const result = await db.collection("post").findOne({ _id: new ObjectId(itemId?.toString()) });
      await db.collection("post").updateOne({ _id: new ObjectId(itemId?.toString()) }, { $inc: { views: 1 } });

      // console.log(result);

      return res.status(200).json(JSON.stringify(result));
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }
  }
};

export default handler;
