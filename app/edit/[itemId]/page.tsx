"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { Button, Dropdown } from "@/components";
import { DataType, itemIdProps } from "@/src/type/types";
import { switchCategory, switchPostCategory } from "@/src/util/function";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getS3PresignedURL } from "@/src/util/api";

const ReactQuill = dynamic(
  async () => {
    const { default: RQ } = await import("react-quill");
    return function comp({ forwardedRef, ...props }: any) {
      return <RQ ref={forwardedRef} {...props} />;
    };
  },
  { ssr: false }
);
const Edit: React.FC<itemIdProps> = ({ params }) => {
  // console.log(params);
  const [updateFile, setUpdateFile] = useState<File | null>();
  console.log(updateFile);
  const [updateFileName, setUpdateFileName] = useState("");
  // const [contentImgValue, setContentImgValue] = useState(true);
  // const [updateSrc, setUpdateSrc] = useState<string>();
  // console.log(updateSrc);

  const [dropDownValue, setDropDownValue] = useState("게임");
  const [postData, setPostData] = useState<DataType>({ title: "", content: "", category: "", author: "", imgUrl: "", modificationDate: "", views: 0 });
  console.log(postData);
  //에디터에 작성된 데이터

  const dropDownList = ["게임", "맛집", "반려동물", "잡담"];

  const router = useRouter();
  const quillRef = useRef<any>();

  const postApi = async () => {
    try {
      // 제목이나 내용이 비어있는지 확인
      if (postData.title === "") {
        return alert("제목을 입력해 주세요");
      }
      if (postData.content === "") {
        return alert("내용을 입력해 주세요");
      }

      let newPostData = { ...postData };

      // 만약 content에서 img태그가 삭제됬거나
      // if (updateFile) {
      //기존 s3 이미지 삭제
      const deleteS3Image = await fetch(`/api/delete/deleteImage?fileName=${postData.imgUrl}`);
      console.log(deleteS3Image.status);

      // // Presigned URL 받아오기
      // const presignedUrl = await getS3PresignedURL(updateFile);

      // // S3 업로드
      // let s3UpladRes = await fetch(presignedUrl.url, {
      //   method: "PUT",
      //   body: updateFile,
      //   headers: { "Content-Type": updateFile.type },
      // });
      // console.log(s3UpladRes);

      // if (s3UpladRes.ok) {
      //   const s3FileUrl = `https://hellostory.s3.ap-northeast-2.amazonaws.com/${presignedUrl.fileName}`;
      //   // setUpdateSrc(s3FileUrl);
      //   // postData.content의 img 태그 src 변경
      //   let parser = new DOMParser();
      //   let doc = parser.parseFromString(postData.content, "text/html");
      //   let imgTags = doc.getElementsByTagName("img");
      //   if (imgTags.length > 0) {
      //     // 첫 번째 img 태그의 src를 변경
      //     imgTags[0].src = s3FileUrl;
      //   }
      //   let newHtml = doc.body.innerHTML;
      //   // 작성되어있는 데이터의 복사본을 만들어서 api보내기
      //   newPostData = { ...postData, content: newHtml, imgUrl: presignedUrl.fileName };
      //   // setPostData((prev) => ({ ...prev, content: newHtml })); // 변경된 HTML을 저장
      //   // console.log(newPostData);
      // } else {
      //   console.log("s3Update 실패");
      // }
      // }
      // const response = await fetch("/api/post/new", { method: "POST", body: JSON.stringify(newPostData) });
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file.size > 1048576) {
        return alert("파일 크기는 1MB 이하의 파일만 업로드 가능합니다.");
      }
      // console.log("file", file);
      setUpdateFile(file);
      setUpdateFileName(file.name);

      const reader = new FileReader();
      reader.onload = () => {
        if (quillRef.current) {
          const quill = quillRef.current.getEditor();
          // const range = quill.getSelection();
          const range = quill.selection.savedRange;
          // const delta = quill.getContents();
          let parser = new DOMParser();
          let doc = parser.parseFromString(postData.content, "text/html");
          let imgTags = doc.getElementsByTagName("img");

          if (imgTags.length === 0) {
            quill.insertEmbed(range.index, "image", String(reader.result));
          } else if (imgTags.length > 0) {
            imgTags[0].src = String(reader.result); // 이미지 URL 변경하기
            let newHtml = doc.documentElement.innerHTML; // 변경된 HTML 가져오기

            quill.setContents(quill.clipboard.convert(newHtml), "user"); // 변경된 HTML을 편집기에 설정하기
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleBackPage = () => {
    router.back();
  };

  const handleDropDownChange = (value: string) => {
    const switchCategory = switchPostCategory(value);
    if (switchCategory !== undefined) {
      setPostData((prevPostData) => ({ ...prevPostData, category: switchCategory }));
    }
  };

  useEffect(() => {
    handleDropDownChange(dropDownValue);
  }, [dropDownValue]);

  useEffect(() => {
    let parser = new DOMParser();
    let doc = parser.parseFromString(postData.content, "text/html");
    let imgTags = doc.getElementsByTagName("img");

    if (imgTags.length === 0) {
      setUpdateFile(null);
      setUpdateFileName("");
      // setContentImgValue(false);
    }
  }, [postData.content]);

  // 유저 아이디에 맞는 데이터 가져오기
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

          // uuid있는 imgUrl에서 uuid를 제외한 파일이름만 가져오기
          let parts = parseData.imgUrl.split(".");
          let fileName = parts.slice(1).join(".");

          const switchCategorey = switchCategory(parseData.category);
          // console.log(switchCategorey);

          setPostData(parseData);
          setUpdateFileName(fileName);
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

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [[{ header: [1, 2, 3, false] }], ["bold", "italic", "underline", "strike"], [{ list: "ordered" }, { list: "bullet" }], [{ color: [] }], [{ align: [] }]],
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
            setPostData((prevPostData) => ({ ...prevPostData, title: e.target.value }));
          }}
        />
      </div>
      <div className="mb-16">
        <p>내용</p>

        <ReactQuill
          forwardedRef={quillRef}
          className="h-64"
          theme="snow"
          modules={modules}
          value={postData.content}
          onChange={(content: string) => {
            setPostData((prev) => ({ ...prev, content }));
          }}
        />
      </div>
      <div className="mb-4">
        <p>첨부파일</p>
        <div className="flex justify-between">
          <p className="flex items-center flex-auto border-2 border-gray-primary rounded-lg px-2 mr-2 text-[#c3c3c3]">{updateFileName ? updateFileName : "최대 1MB, 확장자 jpg, png, gif"}</p>

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
      {/* <img src={updateSrc} alt="icon" /> */}
    </div>
  );
};

// 제목 placeholder css : text-[8px] sm:text-[8px] md:text-[10px] lg:text-xs

//

export default Edit;
