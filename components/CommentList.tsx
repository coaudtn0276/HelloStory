"use client";

import { useEffect, useState } from "react";
import { Button, ChildCommentList } from ".";
import { commentDeleteApi, getCommentApi, postCommentApi } from "@/src/util/api";
import { CommentDataType, CommentListType, ChildCommentDataType } from "@/src/type/types";
import { changeDate } from "@/src/util/function";
import Image from "next/image";
import { cancelIcon } from "@/public/image";
import { useSession } from "next-auth/react";

const CommentList: React.FC<CommentListType> = ({ itemId }) => {
  const [commentValue, setCommentValue] = useState({ author: "", password: "", comment: "" });
  const [getParentData, setGetParentData] = useState<CommentDataType[]>();
  const [getChildData, setChildData] = useState<ChildCommentDataType[]>();

  const [selectId, setSelectId] = useState("");
  const [selectedModalId, setSelectedModalId] = useState("");
  // console.log(selectedModalId);
  const [deleteCommentPw, setDeleteCommentPw] = useState("");

  const session = useSession();

  const handlePostComment = async () => {
    const response = await postCommentApi({ commentValue, itemId });
    if (response && response.resStatus === 200) {
      setGetParentData((prevGetData) => [...(prevGetData ?? []), response.resJson]);
      setCommentValue({ author: "", password: "", comment: "" });
    }
  };

  const handleCommentDelete = async (itemId: string, commnetPw: string, postId: string) => {
    const response = await commentDeleteApi(itemId, commnetPw, postId);
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
    setGetParentData((prevGetData) => prevGetData?.filter((item) => item._id !== itemId));

    return alert("삭제 되었습니다.");
  };

  const handleDeleteCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectId("");
    setDeleteCommentPw("");
  };

  const handleShowChildModal = (id: string) => {
    if (selectedModalId === id) {
      setSelectedModalId(""); // 이미 선택된 comment를 다시 클릭하면 모달을 닫습니다.
    } else {
      setSelectedModalId(id); // 다른 comment를 클릭하면 해당 comment의 모달을 엽니다.
    }
  };

  // const findChildCommnet = (parentId: string) => {
  //   const childData = getChildData?.filter((item) => {
  //     return item.parent === parentId;
  //   });

  //   return childData?.length;
  // };

  const filterChildData = (childData: ChildCommentDataType[], parentId: string) => {
    const data = childData.filter((item) => {
      return item.parent === parentId;
    });
    return data;
  };

  useEffect(() => {
    getCommentApi(itemId).then((res) => {
      const resParse = JSON.parse(res?.resJson);
      setGetParentData(resParse.parentArray);
      setChildData(resParse.childArray);
    });
  }, [itemId]);

  useEffect(() => {
    if (session) {
      setCommentValue((prevCommentValue) => ({ ...prevCommentValue, author: session.data?.user?.name || "" }));
    }
  }, [session]);

  return (
    <div className="flex flex-col text-xs sm:text-xs md:text-sm lg:text-base">
      <div className={`flex ${getParentData?.length === 0 ? null : "border-b-2 border-gray-boxText"}`}>
        <p className="my-2 font-b">댓글</p>
        {/* 댓글 몇개 있는지 보여줄 자리 */}
      </div>

      {/* 댓글 보여줄 자리, 새로운 테이블을  props로 내려줘서 넣기 */}
      {getParentData && (
        <div className={`${getParentData.length === 0 ? null : "mb-6"}`}>
          {getParentData.map((el, idx) => {
            return (
              <div key={el._id} className="flex flex-col py-2 border-b-[1px] border-gray-box">
                <div className="flex justify-between">
                  <div style={{ flex: 1 }}>{getParentData[idx].author}</div>
                  <div
                    style={{ flex: 3 }}
                    className="pr-2"
                    onClick={() => {
                      handleShowChildModal(el._id);
                    }}
                  >
                    {getParentData[idx].comment}
                  </div>
                  <div style={{ flex: 1 }} className="flex justify-between">
                    <div> {changeDate(getParentData[idx].modificationDate)} </div>
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
                                handleCommentDelete(el._id, deleteCommentPw, itemId);
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

                <ChildCommentList childData={filterChildData(getChildData ?? [], el._id)} grandParentId={itemId} parentId={el._id} selectModalId={selectedModalId} />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-between p-2 border-y-2 border-gray-boxText bg-[#F9F9F9]">
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
            className="border-[1px] w-ful pl-2 py-1"
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
  );
};

export default CommentList;

// 댓글은 누구나 와서 자유롭게 ex) dc갤러리
// UI : 닉네임, 댓글 내용, 글 게시 시간, 삭제버튼 순
// 메인 댓글 누르면 댓글 추가 창 생기게
// 로그인이 되어있다면 댓글입력 아이디에 고정닉네임, 없다면 닉네임 작성
// 댓글 비밀번호 입력, 따로 입력하지 않으면 1234 고정,
// db에 넥네임, 댓글 내용, 닉네임, 비밀번호 보내주기
// 댓글 입력되면 댓글 보이는곳 새로고침 (useEffect사용)
// 대댓글에는 parent값과 그 parent의 parent값도 저장. grand_parent
// 대댓글에서는 parent의 값을 통해서 대댓글 불러오기

// post 테이블에 댓글 갯수를 저장해야 할꺼 같음 comments_length
