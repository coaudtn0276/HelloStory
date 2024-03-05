"use client";

import { cancelIcon } from "@/public/image";
import { ChildCommentDataType, ChildCommentListType } from "@/src/type/types";
import { commentDeleteApi, postCommentApi } from "@/src/util/api";
import { changeDate } from "@/src/util/function";
import Image from "next/image";

import { useEffect, useState } from "react";
import { Button } from ".";
import { useSession } from "next-auth/react";

const ChildCommentList = ({ childData, grandParentId, parentId, selectModalId }: ChildCommentListType) => {
  const [getData, setGetData] = useState<ChildCommentDataType[]>(childData);
  // console.log(getData);
  const [commentValue, setCommentValue] = useState({ author: "", password: "", comment: "" });

  const [selectId, setSelectId] = useState("");
  const [deleteCommentPw, setDeleteCommentPw] = useState("");

  const session = useSession();

  const handleDeleteCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectId("");
    setDeleteCommentPw("");
  };

  const handleCommentDelete = async (itemId: string, commnetPw: string) => {
    const response = await commentDeleteApi(itemId, commnetPw, grandParentId);
    // console.log(response);
    if (response?.resStatus === 403) {
      return alert("비밀번호가 틀립니다.");
    }
    if (response?.resStatus !== 200) {
      // console.log(response?.resStatus, response?.resJson);
      return alert("잠시후 다시 시도 바랍니다.");
    }
    setSelectId("");
    setDeleteCommentPw("");
    setGetData((prevGetData) => prevGetData?.filter((item) => item._id !== itemId));

    return alert("삭제 되었습니다.");
  };

  const handlePostComment = async () => {
    const response = await postCommentApi({ commentValue, itemId: parentId, grandParentId });
    if (response && response.resStatus === 200) {
      setGetData((prevGetData) => [...(prevGetData ?? []), response.resJson]);
      setCommentValue({ author: "", password: "", comment: "" });
    }
  };

  // console.log(getData);

  useEffect(() => {
    if (session) {
      setCommentValue((prevCommentValue) => ({ ...prevCommentValue, author: session.data?.user?.name || "" }));
    }
  }, [session]);

  return (
    <div className="flex flex-row-reverse">
      <div className={`flex flex-col w-11/12 ${parentId === selectModalId || childData.length > 0 ? "mt-2" : null} ${getData.length === 0 ? null : "border-x-[1px] border-t-[1px] border-gray-box"} bg-[#F9F9F9]`}>
        {parentId === selectModalId && (
          <div>
            <div className={`flex justify-between p-2 ${getData.length === 0 ? "border-[1px]" : "border-b-[1px]"}  border-gray-box bg-[#F9F9F9]`}>
              <div className="flex flex-col w-1/6 mr-2">
                <input
                  type="text"
                  className="border-[1px] w-full pl-2 py-1 mb-2"
                  placeholder="닉네임"
                  value={commentValue.author}
                  onChange={(e) => {
                    setCommentValue((prevCommentValue) => ({ ...prevCommentValue, author: e.target.value }));
                  }}
                  readOnly={session.data === null ? false : true}
                />
                <input
                  type="password"
                  className="border-[1px] w-ful pl-2 py-1 "
                  placeholder="비밀번호"
                  value={commentValue.password}
                  onChange={(e) => {
                    setCommentValue((prevCommentValue) => ({ ...prevCommentValue, password: e.target.value }));
                  }}
                />
              </div>
              <div className="flex flex-col w-5/6">
                <textarea
                  name="content"
                  className="w-full h-28 p-2 mb-2 resize-none border-[1px]"
                  value={commentValue.comment}
                  onChange={(e) => {
                    setCommentValue((prevCommentValue) => ({ ...prevCommentValue, comment: e.target.value }));
                  }}
                />
                <div className="flex flex-row-reverse ">
                  <Button bg="bg-orange" px="px-6" textSize="inline-flex text-[10px] sm:text-xs md:text-sm lg:text-base" textColor="text-white" handler={handlePostComment}>
                    등록
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {getData.map((el, idx) => {
          return (
            <div key={el._id} className="flex justify-between p-2 border-b-[1px] border-gray-box">
              <div style={{ flex: 1 }}>{getData[idx].author}</div>
              <div style={{ flex: 3 }} className="pr-2">
                <span className="font-b">ㄴ</span> {getData[idx].comment}
              </div>
              <div style={{ flex: 1 }} className="flex justify-between">
                <div> {changeDate(getData[idx].modificationDate)} </div>
                <button className="relative">
                  <Image
                    src={cancelIcon}
                    alt="cancel"
                    className="w-3 sm:w-3 md:w-4 lg:w-5"
                    onClick={() => {
                      setSelectId(el._id);
                    }}
                  />
                  {selectId === el._id ? (
                    <div className="absolute right-7 top-0 flex justify-between border-[1px] border-gray-orane w-36  bg-gray-box">
                      <input
                        type="password"
                        className="w-6/12"
                        value={deleteCommentPw}
                        onChange={(e) => {
                          setDeleteCommentPw(e.target.value);
                        }}
                      />
                      <button
                        className="text-ellipsis break-words flex justify-center items-center text-white font-b"
                        onClick={() => {
                          if (deleteCommentPw) {
                            handleCommentDelete(el._id, deleteCommentPw);
                          }
                        }}
                      >
                        확인
                      </button>
                      <Image
                        src={cancelIcon}
                        alt="cancel"
                        onClick={(e) => {
                          handleDeleteCancel(e);
                        }}
                      />
                    </div>
                  ) : null}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChildCommentList;
