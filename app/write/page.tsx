"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { Button, Dropdown } from "@/components";
import { DataType } from "@/src/type/types";
import { switchPostCategory } from "@/src/util/function";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
const Write = () => {
  const [files, setFiles] = useState<File[]>([]);
  console.log(files);
  const [previewImage, setPreviewImage] = useState("");
  const [fileName, setFileName] = useState("");
  const [dropDownValue, setDropDownValue] = useState("게임");
  const [postData, setPostDate] = useState<DataType>({ title: "", content: "", category: "", author: "", imgUrl: "", modificationDate: "", views: 0 });
  //에디터에 작성된 데이터
  const [content, setContent] = useState("");
  console.log(content);

  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];
  // const contentEditableRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const quillRef = useRef<any>();

  const postApi = async () => {
    try {
      // 이미지 테그를 삭제하는 코드
      // const contentWithoutImg = postData.content.replace(/<img[^>]*>/g, '');
      // const postDataWithoutImg = { ...postData, content: contentWithoutImg };

      if (quillRef.current) {
        const quill = quillRef.current.getEditor();
        const delta = quill.getContents();

        delta.ops.forEach((op: any) => {
          if (typeof op.insert === "object" && op.insert.hasOwnProperty("image")) {
            console.log(op);
            // op.insert.image = '새로운 이미지 URL'; // 변경하려는 URL로 설정
          }
        });
      }

      // const response = await fetch("/api/post/new", { method: "POST", body: JSON.stringify(postData) });
      // if (response.status === 500) {
      //   const errorMessage = await response.json();
      //   console.log(errorMessage);
      //   if (postData.title === "") {
      //     return alert("제목을 입력해 주세요");
      //   }
      //   if (postData.content === "") {
      //     return alert("내용을 입력해 주세요");
      //   }
      // }
      // if (response.status === 200) {
      //   const success = await response.json();
      //   const switchCategory = switchPostCategory(dropDownValue);
      //   console.log(success);
      //   router.push(`/${switchCategory}`);
      // }
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
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        // console.log(file);
        // setPreviewImage(URL.createObjectURL(file));
        setFileName(file.name);
        // console.log(file.name);
        setFiles((prevFiles) => [...prevFiles, file]);

        const reader = new FileReader();
        reader.onload = () => {
          if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            // const range = quill.getSelection();
            const range = quill.selection.savedRange;
            // const delta = quill.getContents();
            if (range) {
              quill.insertEmbed(range.index, "image", String(reader.result));
            }
          }
        };

        reader.readAsDataURL(file);
      }
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
        <ReactQuill forwardedRef={quillRef} className="h-64" theme="snow" modules={modules} value={content} onChange={setContent} />

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
