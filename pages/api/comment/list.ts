import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { ObjectId } from "mongodb";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "GET") {
    try {
      const itmeId = req.query.itemId?.toString();
      //   console.log(itmeId);

      const db = (await connectDB).db("hellostory");
      const findParentArray = await db
        .collection("comment")
        .find({ parent: new ObjectId(itmeId) })
        .toArray();

      const findChildArray = await db
        .collection("comment")
        .find({ grand_parent: new ObjectId(itmeId) })
        .toArray();

      console.log(findChildArray);

      return res.status(200).json(JSON.stringify({ parentArray: findParentArray, childArray: findChildArray }));
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }
  }
};

export default handler;
