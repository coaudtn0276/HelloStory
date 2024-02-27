import { PageList } from "@/components";
import { PostDocument, SearchPageProps } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

const Search = async ({ params }: SearchPageProps) => {
  const decodeParams = decodeURIComponent(params.searchValue);

  const db = (await connectDB).db("hellostory");
  let data = await db
    .collection<PostDocument>("post")
    .find({
      $or: [{ title: { $regex: decodeParams, $options: "i" } }, { content: { $regex: decodeParams, $options: "i" } }],
    })
    .toArray();

  data = JSON.parse(JSON.stringify(data));

  return (
    <div>
      <PageList data={data} containerTitle="검색" />
    </div>
  );
};

export default Search;
