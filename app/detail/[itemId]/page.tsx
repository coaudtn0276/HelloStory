"use client";

import "react-quill/dist/quill.snow.css";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Image from "next/image";

import { Button, CommentList, DeleteModal, DeleteSuccessModal } from "@/components";
import { photoIcon } from "@/public/image";

import { DataType, PostDocument, itemIdProps } from "@/src/type/types";
import { changeDate, switchCategory } from "@/src/util/function";
import { deleteApi } from "@/src/util/api";
import { useSession } from "next-auth/react";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);

const Detail: React.FC<itemIdProps> = ({ params }) => {
  const [getData, setGetdata] = useState<PostDocument>();
  const [changeModiDate, setChangeModiDate] = useState<String>();
  // console.log(getData);
  const [categoryValue, setCategoryValue] = useState<"게임" | "반려동물" | "잡담" | "맛집">();
  const [checkModal, setCheckModal] = useState(false);
  const [deleteValue, setDeleteValue] = useState();

  const router = useRouter();
  const session = useSession();
  const sessionName = session.data?.user?.name;
  console.log(session);

  const handleDeleteApi = async () => {
    const deleteResponse = await deleteApi({ getData });
    setDeleteValue(deleteResponse);
  };

  const handleEdit = () => {
    router.push(`/edit/${params.itemId}`);
  };

  const handleSuccess = () => {
    router.push(`/${getData?.category}`);
  };

  const handleCheckModal = () => {
    setCheckModal(!checkModal);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/get/items?itemId=${params.itemId}`);
        if (response.status === 500) {
          const errorMessage = await response.json();
          console.log(errorMessage);
        }
        if (response.status === 200) {
          const data = await response.json();
          const parseData = JSON.parse(data);

          // 카테고리 변환
          const switchCategorey = switchCategory(parseData.category);
          // 날짜 데이터 변환
          const changeModiDate = changeDate(parseData.modificationDate);
          setChangeModiDate(changeModiDate);
          // console.log(switchCategorey);
          if (switchCategorey !== undefined) {
            setCategoryValue(switchCategorey);
          }

          setGetdata(parseData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.itemId]);

  return (
    <div className="text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex">
        <p className="my-2 font-b">
          <span className="text-orange">{categoryValue} </span>
          story
        </p>
      </div>
      <div className="flex flex-col border-t-2 border-gray-boxText mb-2">
        <div className="flex flex-wrap items-center justify-between py-1 px-4 font-b text-center">
          <div className="flex ">
            <p className="mr-4 text-nowrap">제목</p>
            <div className="flex items-center font-l mr-4">
              <div>{getData?.title}</div>
              {getData?.imgUrl !== "" && <Image src={photoIcon} alt="사진 아이콘" className="ml-2 w-2 sm:w-2 md:w-4 lg:w-5 " />}
            </div>
          </div>
          <div className="flex">
            <div className="flex mr-4">
              <p className="mr-4 text-nowrap">게시일</p>
              <p className="font-l mr-4">{changeModiDate}</p>
            </div>
            <div className="flex">
              <p className="mr-4 text-nowrap">조회수</p>
              <p className="font-l">{getData?.views}</p>
            </div>
          </div>
        </div>
        <div className="flex border-t-[1px] border-[#bdbdbd] py-1 px-4">
          <p className="mr-4 font-b text-nowrap">내용</p>
          <span className="w-11/12">
            <ReactQuill readOnly={true} theme="bubble" value={getData?.content} />
            {/* <div dangerouslySetInnerHTML={{ __html: getData?.content }} /> */}
          </span>
        </div>
        {session.data === undefined || session.data === null ? null : sessionName === getData?.author || sessionName === "admin" ? (
          <div className="flex flex-row-reverse">
            <Button bg="bg-red" px="px-5" textSize="text-xs sm:text-xs md:text-sm lg:text-base" textColor="text-white" handler={handleCheckModal}>
              삭제하기
            </Button>
            <span className="mr-2 ">
              <Button bg="bg-gray-primary" px="px-5" textSize="text-xs sm:text-xs md:text-sm lg:text-base" textColor="text-white" handler={handleEdit}>
                수정하기
              </Button>
            </span>
          </div>
        ) : null}
      </div>
      <CommentList itemId={params.itemId} />
      {checkModal && <DeleteModal checkHandler={handleCheckModal} deleteHandler={handleDeleteApi} />}
      {deleteValue === "success" && <DeleteSuccessModal handler={handleSuccess} />}
    </div>
  );
};

// 글자 크기가 넘어갈때 ... 으로 변경하는 속성
// style={{
//   overflow: "hidden",
//   textOverflow: "ellipsis",
//   wordWrap: "break-word",
//   display: "-webkit-box",
//   WebkitLineClamp: "1",
//   WebkitBoxOrient: "vertical",
// }}

export default Detail;
