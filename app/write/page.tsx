"use client";

import { Dropdown } from "@/components";
import { useRef } from "react";

const Write = () => {
  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (contentEditableRef.current !== null) {
      console.log(contentEditableRef.current.innerHTML);
    }
  };

  return (
    <div className="flex flex-col font-b text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex items-center my-4">
        <p className="text-orange mr-2">카테고리</p>
        <Dropdown dropDownList={dropDownList} />
      </div>
      <div className="mb-4">
        <p>제목</p>
        <input type="text" className="w-full border-2 border-gray-primary rounded-lg h-8 text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs pl-2" placeholder="제목을 입력해 주세요." />
      </div>
      <div>
        <p>내용</p>
        <div ref={contentEditableRef} contentEditable="true" className="text-xs"></div>
        {/* <p>사진을 넣으면 사진 넣을곳</p> */}
        <button onClick={handleClick}>버튼</button>
      </div>
    </div>
  );
};

export default Write;
