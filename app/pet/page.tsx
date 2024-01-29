import { PageList } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

const Pet = async () => {
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ category: "pet" }).sort({ _id: -1 }).toArray();

  data = JSON.parse(JSON.stringify(data));

  // console.log(data);

  return (
    <div>
      <PageList data={data} containerTitle="반려동물" />
    </div>
  );
};

export default Pet;
