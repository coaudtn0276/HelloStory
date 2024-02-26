import { MyPageListProps } from "@/src/type/types";
import CarouselItemsSlick from "./CarouselItemsSlick";

const HotGallery: React.FC<MyPageListProps> = ({ data }) => {
  return (
    <div className="mb-4">
      {/* Link태그 넣어주기 */}
      <h2 className="my-2 font-b text-xs sm:text-sm md:text-base lg:text-lg">
        <span className="text-orange">지금 뜨는 </span>
        gallery
      </h2>
      <span className="flex justify-center">
        <CarouselItemsSlick data={data} />
      </span>
    </div>
  );
};

export default HotGallery;
