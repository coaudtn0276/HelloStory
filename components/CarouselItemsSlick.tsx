"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { ArrowPropsTyps } from "@/src/type/types";

function SampleNextArrow(props: ArrowPropsTyps) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "red" }} onClick={onClick} />;
}

function SamplePrevArrow(props: ArrowPropsTyps) {
  const { className, style, onClick } = props;
  return <div className={className} style={{ ...style, display: "block", background: "green" }} onClick={onClick} />;
}

const CarouselItemsSlick: React.FC = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    // className: "slide",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div className="border-2">
      <h2> Single Item</h2>
      <Slider {...settings}>
        <div className="h-28 bg-red">
          <h3>1</h3>
        </div>
        <div className="h-28 bg-green">
          <h3>2</h3>
        </div>
        <div className="h-28 bg-blue">
          <h3>3</h3>
        </div>
        <div className="h-28 bg-red">
          <h3>4</h3>
        </div>
        <div className="h-28 bg-green">
          <h3>5</h3>
        </div>
        <div className="h-28 bg-blue">
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default CarouselItemsSlick;
