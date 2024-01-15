"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { ArrowPropsTyps } from "@/src/type/types";
import { testImg1, testImg2, testImg3, testImg4, testImg5 } from "@/public/testImg";
import LeftArrow from "@/public/image/LeftArrow";

function SampleNextArrow(props: ArrowPropsTyps) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />;
}

function SamplePrevArrow(props: ArrowPropsTyps) {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <LeftArrow />
    </div>
  );
}

// const StyledSlider = ()=>{
//   return <div className='w-full h-full relative' style={{}}></div>
// }

const CarouselItemsSlick: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // className: "slide",
    nextArrow: <SampleNextArrow />,
    prevArrow: (
      <div className="w-6 h-11 absolute left-0 bottom-30">
        <LeftArrow />
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          // infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };

  const testImgs = [testImg1, testImg2, testImg3, testImg4, testImg5];

  return (
    <div className="w-10/12">
      <Slider {...settings}>
        {testImgs.map((el, idx) => {
          return (
            <div key={idx} className="w-28 h-28 ">
              <img src={el.src} className="w-full h-full object-cover" />
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CarouselItemsSlick;
