import { PageList } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

const Pet = async () => {
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ category: "pet" }).toArray();

  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <PageList data={data} containerTitle="반려동물" />
    </div>
  );
};

export default Pet;
