import { PageList } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

const Chat = async () => {
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ category: "chat" }).sort({ _id: -1 }).toArray();

  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <PageList data={data} containerTitle="잡담" />
    </div>
  );
};

export default Chat;
