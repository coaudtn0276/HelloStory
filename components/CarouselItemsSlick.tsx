"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styled from "styled-components";

import Slider from "react-slick";
import LeftArrow from "@/public/image/LeftArrow";
import { RightArrow } from "@/public/image";
import { useState } from "react";
import { MyPageListProps } from "@/src/type/types";
import Link from "next/link";

const StyledSlider = styled(Slider)`
  width: 100%;
  height: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Pre = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: -7%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: -11%;
  z-index: 3;
`;

const CarouselItemsSlick: React.FC<MyPageListProps> = ({ data }) => {
  const [arrowColor, setArrowColor] = useState("");

  const handleArrowColor = (path: "right" | "left") => {
    setArrowColor(path);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: (
      <NextTo>
        <div
          className="scale-50 sm:scale-50 md:scale-75 lg:scale-90"
          onClick={() => {
            handleArrowColor("right");
          }}
        >
          <RightArrow color={arrowColor === "right" ? "#ff7c33" : "#BDBDBD"} />
        </div>
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <div
          className="scale-50 sm:scale-50 md:scale-75 lg:scale-90"
          onClick={() => {
            handleArrowColor("left");
          }}
        >
          <LeftArrow color={arrowColor === "left" ? "#ff7c33" : "#BDBDBD"} />
        </div>
      </Pre>
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

  return (
    <div className="w-10/12">
      <StyledSlider {...settings}>
        {data.map((el) => {
          return (
            <Link key={el._id} href={`/detail/${el._id}`} className="w-28 h-28 ">
              <img src={`https://hellostory.s3.ap-northeast-2.amazonaws.com/${el.imgUrl}`} className="w-full h-full object-cover" />
            </Link>
          );
        })}
      </StyledSlider>
    </div>
  );
};

export default CarouselItemsSlick;
