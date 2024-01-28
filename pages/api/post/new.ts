import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "POST") {
    try {
      console.log(JSON.parse(req.body));
      const db = (await connectDB).db("hellostory");
    } catch (error) {}
  }
};

export default handler;
