"use client";

import { useState } from "react";
import ItemsCarousel from "react-items-carousel";

const CarouselItems: React.FC = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [numOfCards, setNumOfCards] = useState(4);
  const [gutter, setGutter] = useState(20);

  // console.log(activeItemIndex);

  return (
    <div className="w-full px-20">
      <ItemsCarousel chevronWidth={0} gutter={gutter} numberOfCards={numOfCards} slidesToScroll={1} outsideChevron={true} activeItemIndex={activeItemIndex} requestToChangeActive={setActiveItemIndex} rightChevron={<button>{">"}</button>} leftChevron={<button className="mr-5">{"<"}</button>}>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>1 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>2 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>3 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>4 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>5 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>6 card</div>
        <div style={{ width: 100, height: 100, background: "#EEE" }}>7 card</div>
      </ItemsCarousel>
    </div>
  );
};

export default CarouselItems;
