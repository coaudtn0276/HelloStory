"use client";

import { LeftArrowIcon, RightArrowIcon } from "@/public/image";
import { useState } from "react";

type PaginationProps = {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  handler?: (e: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ totalPosts, postsPerPage, currentPage, handler }) => {
  const [arrowColor, setArrowColor] = useState("");

  const numOfPage = Math.ceil(totalPosts / postsPerPage);
  let totalButtons = new Array(numOfPage).fill(null);
  totalButtons = totalButtons.map((_, index) => index + 1);

  const totalPage = Math.ceil(totalPosts / postsPerPage);

  const handleArrowColor = (path: "right" | "left") => {
    setArrowColor(path);
  };

  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={() => {
          if (currentPage !== 1) {
            handler?.(currentPage - 1);
          }
        }}
        className="text-[#9FA0A6] hover:text-[#191919] mr-5"
      >
        <div
          className="scale-50 sm:scale-50 md:scale-75 lg:scale-90"
          onClick={() => {
            handleArrowColor("left");
          }}
        >
          <LeftArrowIcon color={arrowColor === "left" ? "#ff7c33" : "#BDBDBD"} />
        </div>
      </button>

      {totalButtons.map((pageNumber, idx) => {
        return (
          <button key={idx} onClick={handler?.bind(null, pageNumber)} className={`mr-5 text-xs sm:text-sm md:text-base lg:text-lg ${currentPage === pageNumber ? "font-b text-orange" : "font-l text-gray-primary"}`}>
            {pageNumber}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => {
          if (currentPage !== totalPage) {
            handler?.(currentPage + 1);
          }
        }}
        className="text-[#9FA0A6] hover:text-[#191919] "
      >
        <div
          className="scale-50 sm:scale-50 md:scale-75 lg:scale-90"
          onClick={() => {
            handleArrowColor("right");
          }}
        >
          <RightArrowIcon color={arrowColor === "right" ? "#ff7c33" : "#BDBDBD"} />
        </div>
      </button>
    </div>
  );
};

export default Pagination;
