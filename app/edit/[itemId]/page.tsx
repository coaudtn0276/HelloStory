"use client";

import { Button, Dropdown } from "@/components";
import { DataType, itemIdProps } from "@/src/type/types";
import { switchCategory, switchPostCategory } from "@/src/util/function";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Edit: React.FC<itemIdProps> = ({ params }) => {
  // console.log(params);
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [dropDownValue, setDropDownValue] = useState("");
  // console.log(dropDownValue);
  const [postData, setPostDate] = useState<DataType>({ title: "", content: "", category: "", author: "", imgUrl: "", modificationDate: "", views: 0 });
  // console.log(postData);

  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  // content에 사용자가 작성한 내용이 어떤태그들이 들어오는지 테스트 버튼
  // const handleClick = () => {
  //   if (contentEditableRef.current !== null) {
  //     console.log(contentEditableRef.current.innerHTML);
  //   }
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      setPreviewImage(URL.createObjectURL(file));
      setFileName(file.name);
      // console.log(file.name);
    }
  };

  const handleBackPage = () => {
    router.back();
  };

  const handleDropDownChange = (value: string) => {
    const switchCategory = switchPostCategory(value);
    if (switchCategory !== undefined) {
      setPostDate((prevPostData) => ({ ...prevPostData, category: switchCategory }));
    }
  };

  useEffect(() => {
    handleDropDownChange(dropDownValue);
  }, [dropDownValue]);

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
          const switchCategorey = switchCategory(parseData.category);
          // console.log(switchCategorey);

          setPostDate(parseData);
          if (switchCategorey !== undefined) {
            setDropDownValue(switchCategorey);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [params.itemId]);

  return (
    <div className="flex flex-col font-b text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex items-center my-4">
        <p className="text-orange mr-2">카테고리</p>
        <Dropdown dropDownList={dropDownList} onValueChange={setDropDownValue} putCategorey={dropDownValue} />
      </div>
      <div className="mb-4">
        <p>제목</p>
        <input
          type="text"
          className="w-full border-2 border-gray-primary rounded-lg h-8 pl-2"
          placeholder="제목을 입력해 주세요."
          value={postData.title}
          onChange={(e) => {
            setPostDate((prevPostData) => ({ ...prevPostData, title: e.target.value }));
          }}
        />
      </div>
      <div className="mb-2">
        <p>내용</p>
        <div
          ref={contentEditableRef}
          contentEditable="true"
          className="text-xs w-full h-96 border-2 rounded-lg p-2 border-gray-primary"
          onInput={(e) => {
            // console.log(e.currentTarget);
            setPostDate({ ...postData, content: e.currentTarget.innerHTML });
          }}
        >
          {postData.content && <div dangerouslySetInnerHTML={{ __html: postData.content }} />}
          <br />
          {previewImage && (
            <p className="w-36">
              <img src={previewImage} alt="previewImage" className="object-cover" />
            </p>
          )}
        </div>

        {/* <button onClick={handleClick}>버튼</button> */}
      </div>
      <div className="mb-4">
        <p>첨부파일</p>
        <div className="flex justify-between">
          <p className="flex items-center flex-auto border-2 border-gray-primary rounded-lg px-2 mr-2 text-[#c3c3c3]">{fileName ? fileName : "최대 5MB, 확장자 jpg, png, gif"}</p>

          <div className="border-2 border-gray-box rounded-lg cursor-pointer px-6 py-1 text-gray-boxText bg-gray-box">
            <label htmlFor="file-upload">파일 찾기</label>
            <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button bg="bg-orange" px="px-6" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-white">
          작성 완료
        </Button>
        <span className="mr-2">
          <Button bg="bg-gray-primary" px="px-6" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-white" handler={handleBackPage}>
            작성 취소
          </Button>
        </span>
      </div>
    </div>
  );
};

// 제목 placeholder css : text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs

export default Edit;
