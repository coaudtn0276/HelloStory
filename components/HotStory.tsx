"use client";

import { photoIcon } from "@/public/image";
import { HotStoryProps } from "@/src/type/types";
import { changeDate, switchCategory } from "@/src/util/function";
import { testdata } from "@/testdata";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Pagination } from ".";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { NavParamsAtom } from "@/recoil/NavParamsAtom";

const HotStory: React.FC<HotStoryProps> = ({ data, containerTitle }) => {
  // 전체 data중에서 조회수 높은 순으로 정렬

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const offset = (currentPage - 1) * postsPerPage;

  const setActiveLink = useSetRecoilState(NavParamsAtom);

  const totalPosts = data.slice(offset, offset + postsPerPage).map((el, idx) => {
    const changeModiDate = changeDate(el.modificationDate);

    return (
      <Link href={`/detail/${el._id.toString()}`} key={idx} className="flex justify-between py-[2px] font-l text-center border-b-[1px] border-b-[#bdbdbd]">
        <p style={{ flex: 1 }}>{idx + 1}</p>
        <p style={{ flex: 1 }}>{switchCategory(el.category)}</p>
        <div style={{ flex: 3 }} className="flex items-center text-left mr-4">
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordWrap: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {el.title}
          </div>
          {el.imgUrl !== "" && <Image src={photoIcon} alt="사진 아이콘" className="ml-2 w-2 sm:w-2 md:w-3 lg:w-4 mr-4" />}
          {el.commentNum && el.commentNum > 0 ? <span className="text-red font-b">(+{el.commentNum})</span> : null}
        </div>
        <p style={{ flex: 1 }}>{changeModiDate}</p>
        <div style={{ flex: 1 }}>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              wordWrap: "break-word",
              display: "-webkit-box",
              WebkitLineClamp: "1",
              WebkitBoxOrient: "vertical",
            }}
          >
            {el.author}
          </div>
        </div>
        <p style={{ flex: 1 }}>{el.views}</p>
      </Link>
    );
  });

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    setActiveLink("/");
  }, [setActiveLink]);

  return (
    <div className="flex flex-col w-full h-full text-xs sm:text-sm md:text-base lg:text-lg">
      <p className="my-2 font-b">
        <span className="text-orange">{containerTitle} </span>
        story
      </p>

      <div className="flex flex-col border-y-2 border-gray-boxText mb-2">
        <div className="flex justify-between py-[2px] border-b-2 border-b-gray-boxText font-b text-center">
          <p style={{ flex: 1 }}>번호</p>
          <p style={{ flex: 1 }}>카테고리</p>
          <p style={{ flex: 3 }}>제목</p>
          <p style={{ flex: 1 }}>게시일</p>
          <p style={{ flex: 1 }}>글쓴이</p>
          <p style={{ flex: 1 }}>조회수</p>
        </div>
        <div className="flex flex-col border-b-gray-boxText font-b">{totalPosts}</div>
      </div>

      <div className="flex justify-center">
        <Pagination totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} handler={setPage} />
      </div>
    </div>
  );
};

export default HotStory;
