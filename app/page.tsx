import CarouselItemsSlick from "@/components/CarouselItemsSlick";
import HotGallery from "@/components/HotGallery";
import { connectDB } from "@/src/util/database";

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  const result = await db.collection("post").find({ type: "chat" }).toArray();
  // console.log(result);

  return (
    <div className="text-gray-primary  ">
      <HotGallery />
      {/* <CarouselItemsSlick /> */}
      {/* 메인페이지 */}
    </div>
  );
}
