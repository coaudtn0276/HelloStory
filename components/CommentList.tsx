"use client";

import { useEffect, useState } from "react";
import { Button } from ".";
import { getCommentApi, postCommentApi } from "@/src/util/api";
import { CommentDataType, CommentListType } from "@/src/type/types";
import { changeDate } from "@/src/util/function";

const CommentList: React.FC<CommentListType> = ({ itemId }) => {
  const [commentValue, setCommentValue] = useState({ author: "", password: "", comment: "" });
  const [getData, setGetDate] = useState<CommentDataType[]>();

  const handlePostComment = async () => {
    const response = await postCommentApi({ commentValue, itemId });
    console.log(response);
    if (response && response.resStatus === 200) {
      getCommentApi(itemId).then((res) => {
        setGetDate(JSON.parse(res?.resJson));
        setCommentValue({ author: "", password: "", comment: "" });
      });
    }
  };

  useEffect(() => {
    getCommentApi(itemId).then((res) => {
      setGetDate(JSON.parse(res?.resJson));
    });
    // console.log(response)
  }, [itemId]);

  return (
    <div className="flex flex-col text-xs sm:text-xs md:text-sm lg:text-base">
      <div className={`flex ${getData && "border-b-2 border-gray-boxText"}`}>
        <p className="my-2 font-b">댓글</p>
        {/* 댓글 몇개 있는지 보여줄 자리 */}
      </div>

      {/* 댓글 보여줄 자리, 새로운 테이블을  props로 내려줘서 넣기 */}
      {getData &&
        getData.map((el, idx) => {
          return (
            <div key={el._id} className="flex justify-between items-center">
              <div style={{ flex: 1 }}>{getData[idx].author}</div>
              <div style={{ flex: 4 }}>{getData[idx].comment}</div>
              <div style={{ flex: 1 }} className="flex justify-between">
                <div> {changeDate(getData[idx].modificationDate)} </div>
                <button>x</button>
              </div>
            </div>
          );
        })}

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
