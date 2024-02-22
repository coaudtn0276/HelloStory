"use client";

import { menuIcon, photoIcon, searchImg } from "@/public/image";
import { MyPageListProps, PostDocument } from "@/src/type/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, DeleteModal, DeleteSuccessModal, Dropdown, Pagination } from ".";
import { changeDate } from "@/src/util/function";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteApi } from "@/src/util/api";

const MyPageList: React.FC<MyPageListProps> = ({ data }) => {
  console.log(data);
  // 전체 data중에서 최신 등록 순으로 정렬
  const [inputValue, setInputValue] = useState("");
  const [dataToUse, setDataUse] = useState(data);
  const [riseFallValue, setRiseFallValue] = useState(false);
  const [dropDownValue, setDropDownValue] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;
  const offset = (currentPage - 1) * postsPerPage;

  const [checkModal, setCheckModal] = useState(false);
  const [deleteValue, setDeleteValue] = useState<"success" | "">();
  const [deleteData, setDeleteData] = useState<PostDocument>();

  const router = useRouter();

  const handleClickRiseFall = () => {
    setRiseFallValue(!riseFallValue);
  };

  const handleEdit = (event: React.MouseEvent, itemId: string) => {
    event.preventDefault();
    router.push(`/edit/${itemId}`);
  };

  const handleCheckModal = (event: React.MouseEvent) => {
    event.preventDefault();
    setCheckModal(!checkModal);
  };

  const handleDeleteApi = async () => {
    const deleteResponse = await deleteApi({ getData: deleteData });
    setDeleteValue(deleteResponse);
  };

  const handleSuccess = () => {
    router.refresh();
    setDeleteValue("");
  };

  useEffect(() => {
    if (riseFallValue) {
      const riseFallData = [...data].sort((a, b) => b.views - a.views);
      setDataUse(riseFallData);
    } else {
      setDataUse(data);
    }
  }, [riseFallValue, data]);

  const totalPosts = dataToUse.slice(offset, offset + postsPerPage).map((el, idx) => {
    const changeModiDate = changeDate(el.modificationDate);
    const stringItmeId = el._id.toString();

    return (
      // /detail/[itmeId]를 만들고 내부의 {...}stroy부분은 useEffect로 가져온 데이터의 category를 받아서 변경
      <Link href={`/detail/${stringItmeId}`} key={stringItmeId} className="flex justify-between py-[2px] font-l text-center border-b-[1px] border-b-[#bdbdbd]">
        <p style={{ flex: 1 }} className="flex items-center justify-center">
          {idx + 1}
        </p>
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
          {el.imgUrl !== "" && <Image src={photoIcon} alt="사진 아이콘" className="ml-2 w-2 sm:w-2 md:w-3 lg:w-4" />}
        </div>
        <p style={{ flex: 1 }} className="flex items-center justify-center">
          {changeModiDate}
        </p>

        <p style={{ flex: 1 }} className="flex items-center justify-center">
          {el.views}
        </p>
        <div style={{ flex: 2 }}>
          <div className="flex flex-row-reverse justify-center">
            <div
              onClick={(e) => {
                handleCheckModal(e);
                // console.log(el);
                setDeleteData(el);
              }}
            >
              <Button bg="bg-red" px="px-4" textSize="text-[8px] sm:text-[10px] md:text-[10px] lg:text-xs whitespace-nowrap" textColor="text-white">
                삭제
              </Button>
            </div>
            <div
              className="mr-2"
              onClick={(e) => {
                handleEdit(e, el._id);
              }}
            >
              <Button bg="bg-gray-primary" px="px-4" textSize="text-[8px] sm:text-[10px] md:text-[10px] lg:text-xs whitespace-nowrap" textColor="text-white">
                수정
              </Button>
            </div>
          </div>
        </div>
      </Link>
    );
  });

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full h-full text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex justify-between">
        <p className="my-2 font-b">
          <span className="text-orange">나의 </span>
          story
        </p>
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
          <p style={{ flex: 3 }} className="mr-4">
            제목
          </p>
          <p style={{ flex: 1 }}>게시일</p>
          <p style={{ flex: 1 }}>조회수</p>
          <p style={{ flex: 2 }}></p>
        </div>
        <div className="flex flex-col border-b-gray-boxText font-b">{totalPosts}</div>
      </div>

      <div className="flex flex-col">
        <span className="mb-2">
          <Pagination totalPosts={data.length} postsPerPage={postsPerPage} currentPage={currentPage} handler={setPage} />
        </span>
        <span className="flex justify-center items-center">
          <span className="mr-2">
            <Dropdown onValueChange={setDropDownValue} />
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
      {checkModal && <DeleteModal checkHandler={handleCheckModal} deleteHandler={handleDeleteApi} />}
      {deleteValue === "success" && <DeleteSuccessModal handler={handleSuccess} />}
    </div>
  );
};

export default MyPageList;
