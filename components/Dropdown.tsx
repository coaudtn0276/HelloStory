"use client";

import { BottomArrowIcon } from "@/public/image";
import { DropDownProps } from "@/src/type/types";
import { useState } from "react";

const Dropdown: React.FC<DropDownProps> = ({ dropDownList }) => {
  const [clickDropdown, setClickDropdown] = useState(false);
  const [dropdownValue, setDropdownValue] = useState(dropDownList ? dropDownList[0] : "제목 + 내용");

  const handleClickDropdown = () => {
    setClickDropdown(!clickDropdown);
  };

  return (
    <div className="min-w-[101px] sm:min-w-[101px] md:min-w-[111px] lg:min-w-[120px]">
      <button className={`relative flex justify-between items-center bg-gray-primary text-white ${dropDownList ? "text-[10px] sm:text-[12px] md:text-xs lg:text-sm" : "text-xs sm:text-xs md:text-sm lg:text-base"}  font-b py-1 px-3 min-w-[101px] sm:min-w-[101px] md:min-w-[111px] lg:min-w-[120px] ${clickDropdown ? "rounded-t-lg" : "rounded-lg"}`} onClick={handleClickDropdown}>
        {dropdownValue}
        <span className="rotate-90 ml-2 scale-50 sm:scale-50 md:scale-75 lg:scale-90">
          <BottomArrowIcon />
        </span>

        <div className={`absolute top-6 left-0 min-w-[102px] sm:min-w-[102px] md:min-w-[111px] lg:min-w-[121px] flex flex-col font-b pl-2 py-2 text-black text-left border-x-2 border-b-2 border-gray-primary rounded-b-md cursor-pointer bg-white ${!clickDropdown ? "hidden" : ""}`}>
          <p
            className="hover:underline"
            onClick={() => {
              {
                dropDownList ? setDropdownValue(dropDownList[0]) : setDropdownValue("제목 + 내용");
              }
              setClickDropdown(false);
            }}
          >
            {dropDownList ? dropDownList[0] : "제목 + 내용"}
          </p>
          <p
            className="hover:underline"
            onClick={() => {
              {
                dropDownList ? setDropdownValue(dropDownList[1]) : setDropdownValue("제목");
              }
              setClickDropdown(false);
            }}
          >
            {dropDownList ? dropDownList[1] : "제목"}
          </p>
          <p
            className="hover:underline"
            onClick={() => {
              {
                dropDownList ? setDropdownValue(dropDownList[2]) : setDropdownValue("내용");
              }
              setClickDropdown(false);
            }}
          >
            {dropDownList ? dropDownList[2] : "내용"}
          </p>
          <p
            className="hover:underline"
            onClick={() => {
              {
                dropDownList ? setDropdownValue(dropDownList[3]) : setDropdownValue("글쓴이");
              }
              setClickDropdown(false);
            }}
          >
            {dropDownList ? dropDownList[3] : "글쓴이"}
          </p>
        </div>
      </button>
    </div>
  );
};

// text-xs sm:text-xs md:text-xs lg:text-sm
// min-w-[101px] sm:min-w-[101px] md:min-w-[111px] lg:min-w-[120px]
// w-24 sm:w-24 md:w-28 lg:w-28 h-7
// px-3 py-1

export default Dropdown;
