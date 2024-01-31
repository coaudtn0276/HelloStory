"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { Button, Dropdown } from "@/components";
import { DataType } from "@/src/type/types";
import { switchPostCategory } from "@/src/util/function";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Write = () => {
  // - 정규식을 사용하여 src 속성을 찾아 새로운 이미지 URL로 교체, img태그가 있으면 교체 or 공백으로 만들어줌.
  // - 만약 img태그가 있다면 서버에 content를 보낼 때 공백으로 변환해서 넣어주고 서버에서 s3로 받은 url을 넣어주기.
  // let htmlString = '<p>test</p><p><img src="imgUrl"></p><p>test</p>';
  // let newImgUrl = "newImgUrl"; // 새로운 이미지 URL

  // if (htmlString.match(/<img src="[^"]*"/)) {
  //   htmlString = htmlString.replace(/<img src="[^"]*"/g, `<img src="${newImgUrl}"`);
  // }
  // console.log(htmlString);

  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [dropDownValue, setDropDownValue] = useState("게임");
  // console.log(dropDownValue);
  const [postData, setPostDate] = useState<DataType>({ title: "", content: "", category: "", author: "", imgUrl: "", modificationDate: "", views: 0 });
  //에디터에 작성된 데이터
  const [content, setContent] = useState("");
  console.log(content);

  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const postApi = async () => {
    try {
      // 이미지 테그를 삭제하는 코드
      // const contentWithoutImg = postData.content.replace(/<img[^>]*>/g, '');
      // const postDataWithoutImg = { ...postData, content: contentWithoutImg };

      const response = await fetch("/api/post/new", { method: "POST", body: JSON.stringify(postData) });
      if (response.status === 500) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        if (postData.title === "") {
          return alert("제목을 입력해 주세요");
        }
        if (postData.content === "") {
          return alert("내용을 입력해 주세요");
        }
      }
      if (response.status === 200) {
        const success = await response.json();
        const switchCategory = switchPostCategory(dropDownValue);
        console.log(success);
        router.push(`/${switchCategory}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], [{ color: [] }], [{ align: [] }, "image"]],
      },
    };
  }, []);

  return (
    <div className="flex flex-col font-b text-xs sm:text-sm md:text-base lg:text-lg">
      <div className="flex items-center my-4">
        <p className="text-orange mr-2">카테고리</p>
        <Dropdown dropDownList={dropDownList} onValueChange={setDropDownValue} />
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
      <div className="mb-16">
        <p>내용</p>

        {/* <div
          ref={contentEditableRef}
          contentEditable="true"
          className="text-xs w-full h-96 border-2 rounded-lg p-4 border-gray-primary overflow-y-scroll"
          onInput={(e) => {
            // console.log(e.currentTarget);
            setPostDate({ ...postData, content: e.currentTarget.innerHTML });
          }}
        >
          <br />
          {previewImage && (
            <p className="w-36">
              <img src={previewImage} alt="previewImage" className="object-cover" />
            </p>
          )}
        </div> */}
        <ReactQuill className="h-64" theme="snow" modules={modules} value={content} onChange={setContent} />

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
        <Button bg="bg-orange" px="px-6" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-white" handler={postApi}>
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

export default Write;
