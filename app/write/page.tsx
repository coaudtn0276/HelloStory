"use client";

import { Dropdown } from "@/components";
import { useRef, useState } from "react";

const Write = () => {
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");

  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (contentEditableRef.current !== null) {
      console.log(contentEditableRef.current.innerHTML);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
      // console.log(file.name);
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
      <div className="mb-2">
        <p>내용</p>
        <div ref={contentEditableRef} contentEditable="true" className="text-xs w-full h-96 border-2 rounded-lg p-2 border-gray-primary">
          {previewImage && (
            <p className="w-36">
              <img src={previewImage} alt="previewImage" className="object-cover" />
            </p>
          )}
        </div>

        <button onClick={handleClick}>버튼</button>
      </div>
      <div>
        <p>첨부파일</p>
        <div className="flex justify-between">
          <p className="flex-auto border-2 border-gray-primary rounded-lg px-2">{fileName ? fileName : "최대 5MB, 확장자 jpg, png, gif"}</p>

          <div>
            <label htmlFor="file-upload" className="w-full h-8 border-2 border-gray-primary rounded-lg cursor-pointer">
              파일 찾기
            </label>
            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
