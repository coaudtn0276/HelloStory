import { PageList } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

export const dynamic = "force-dynamic";

const Restaurant = async () => {
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ category: "restaurant" }).sort({ _id: -1 }).toArray();

  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <PageList data={data} containerTitle="맛집" />
    </div>
  );
};

export default Restaurant;
