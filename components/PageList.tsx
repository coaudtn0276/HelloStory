"use client";

import { menuIcon, photoIcon, searchImg } from "@/public/image";
import { PageListProps } from "@/src/type/types";
import { testdata } from "@/testdata";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dropdown, Pagination } from ".";

const PageList: React.FC<PageListProps> = ({ data, containerTitle }) => {
  // 전체 data중에서 최신 등록 순으로 정렬
  const [inputValue, setInputValue] = useState("");
  const [dataToUse, setDataUse] = useState(testdata);
  const [riseFallValue, setRiseFallValue] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const offset = (currentPage - 1) * postsPerPage;

  const handleClickRiseFall = () => {
    setRiseFallValue(!riseFallValue);
  };

  useEffect(() => {
    if (riseFallValue) {
      const riseFallData = [...testdata].sort((a, b) => b.views - a.views);
      setDataUse(riseFallData);
    } else {
      setDataUse(testdata);
    }
  }, [riseFallValue]);

  const totalPosts = dataToUse.slice(offset, offset + postsPerPage).map((el, idx) => {
    return (
      <div key={idx} className="flex justify-between py-[2px] font-l text-center border-b-[1px] border-b-[#bdbdbd]">
        <p style={{ flex: 1 }}>{idx + 1}</p>
        <p style={{ flex: 4 }} className="flex items-center text-left">
          {el.title}
          {el.imgUrl !== "" && <Image src={photoIcon} alt="사진 아이콘" className="ml-2 w-2 sm:w-2 md:w-3 lg:w-4 h-2 sm:h-2 md:h-3 lg:h-4" />}
        </p>
        <p style={{ flex: 1 }}>{el.modificationDate}</p>
        <p style={{ flex: 1 }}>{el.author}</p>
        <p style={{ flex: 1 }}>{el.views}</p>
      </div>
    );
  });

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full h-full text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex justify-between">
        <h2 className="my-2 font-b">
          <span className="text-orange">{containerTitle} </span>
          story
        </h2>
        <div className="flex items-center cursor-pointer" onClick={handleClickRiseFall}>
          <button>
            <Image src={menuIcon} alt="메뉴 아이콘" className="ml-3 w-3 sm:w-3 md:w-4 lg:w-5 h-3 sm:h-2 md:h-4 lg:h-5 mr-2" />
          </button>
          <span className="text-orange font-b">인기 순 정렬</span>
        </div>
      </div>

      <div className="flex flex-col border-y-2 border-gray-boxText mb-2">
        <div className="flex justify-between py-[2px] border-b-2 border-b-gray-boxText font-b text-center">
          <p style={{ flex: 1 }}>번호</p>
          <p style={{ flex: 4 }}>제목</p>
          <p style={{ flex: 1 }}>게시일</p>
          <p style={{ flex: 1 }}>글쓴이</p>
          <p style={{ flex: 1 }}>조회수</p>
        </div>
        <div className="flex flex-col border-b-gray-boxText font-b">{totalPosts}</div>
      </div>

      <div className="flex flex-col">
        <span className="mb-2">
          <Pagination totalPosts={testdata.length} postsPerPage={postsPerPage} currentPage={currentPage} handler={setPage} />
        </span>
        <span className="flex justify-center items-center">
          <span className="mr-2">
            <Dropdown />
          </span>
          <div className="flex justify-between items-center w-7/12  h-6 md:h-7 lg:h-8 px-2 border-2 border-gray-primary rounded-md">
            <input
              type="text"
              className="font-b w-full outline-none text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs placeholder-[#d6d6d6] "
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            />
            <button type="submit">
              <Image src={searchImg} alt="searchImg" className="w-3 sm:w-4 md:w-5 lg:w-4 h-3 sm:h-4 md:h-5" />
            </button>
          </div>
        </span>
      </div>
    </div>
  );
};

export default PageList;
