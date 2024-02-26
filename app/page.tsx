import { HotGallery, HotStory } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hello Stroy",
  description: "Hello Stroy",
};

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  // data props로 내려줄때 각 컴포넌트에 맞는 데이터 filter해서 내려주기
  let topViewsData = await db.collection<PostDocument>("post").find().sort({ views: -1 }).toArray();
  let realTimeData = await db.collection<PostDocument>("post").find().sort({ modificationDate: -1 }).toArray();
  let findImageUrl = await db
    .collection<PostDocument>("post")
    .find({ imgUrl: { $exists: true, $ne: "" } })
    .toArray();

  topViewsData = JSON.parse(JSON.stringify(topViewsData));
  realTimeData = JSON.parse(JSON.stringify(realTimeData));
  findImageUrl = JSON.parse(JSON.stringify(findImageUrl));
  // console.log(findImageUrl);

  return (
    <div>
      <HotGallery data={findImageUrl} />
      <HotStory data={topViewsData} containerTitle="지금 뜨는" />
      <HotStory data={realTimeData} containerTitle="실시간" />
      {/* 메인페이지 */}
    </div>
  );
}
