import { HotGallery, HotStory } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  // data props로 내려줄때 각 컴포넌트에 맞는 데이터 filter해서 내려주기
  const data = await db.collection<PostDocument>("post").find().toArray();

  return (
    <div>
      <HotGallery />
      <HotStory data={data} containerTitle="지금 뜨는" />
      <HotStory data={data} containerTitle="실시간" />
      {/* 메인페이지 */}
    </div>
  );
}
