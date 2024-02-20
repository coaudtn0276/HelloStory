import { MyPageList } from "@/components";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { getServerSession } from "next-auth";

const MyPost = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ author: session.user.name }).sort({ _id: -1 }).toArray();

  data = JSON.parse(JSON.stringify(data));

  //   console.log("gameData", data);

  return (
    <div>
      <MyPageList data={data} />
    </div>
  );
};

export default MyPost;
