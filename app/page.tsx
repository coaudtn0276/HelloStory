import CarouselItems from "@/components/CarouselItems";
import CarouselItemsSlick from "@/components/CarouselItemsSlick";
import { connectDB } from "@/src/util/database";

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  const result = await db.collection("post").find({ type: "chat" }).toArray();
  // console.log(result);

  return (
    <div className="text-gray-primary  ">
      <CarouselItemsSlick />
      {/* <CarouselItems /> */}
      {/* 메인페이지 */}
    </div>
  );
}
