import { CommentValueType, DeleteApiType, PostApiType, PresignedUrlResponse, PutApiType, RegisterApiType } from "../type/types";
import { findImgTag, switchPostCategory } from "./function";

export const getS3PresignedURL = async (file: File) => {
  const filename = encodeURIComponent(file.name);
  const fileType = file.type;
  let res = await fetch(`/api/post/image?fileName=${filename}&fileType=${fileType}`);
  const data = await res.json();
  return data;
};

export const postApi = async ({ postData, updateFile, dropDownValue, router }: PostApiType) => {
  // 제목이나 내용이 비어있는지 확인
  if (postData.title === "") {
    return alert("제목을 입력해 주세요");
  }
  if (postData.content === "") {
    return alert("내용을 입력해 주세요");
  }
  try {
    let newPostData = { ...postData };
    if (updateFile) {
      // Presigned URL 받아오기
      const presignedUrl = await getS3PresignedURL(updateFile);
      console.log(presignedUrl);

      // S3 업로드
      let s3UpladRes = await fetch(presignedUrl.url, {
        method: "PUT",
        body: updateFile,
        headers: { "Content-Type": updateFile.type },
      });
      console.log(s3UpladRes);

      if (s3UpladRes.ok) {
        const s3FileUrl = `https://hellostory.s3.ap-northeast-2.amazonaws.com/${presignedUrl.fileName}`;
        // setUpdateSrc(s3FileUrl);

        // postData.content의 img 태그 src 변경
        let parser = new DOMParser();
        let doc = parser.parseFromString(postData.content, "text/html");
        let imgTags = doc.getElementsByTagName("img");
        if (imgTags.length > 0) {
          // 첫 번째 img 태그의 src를 변경
          imgTags[0].src = s3FileUrl;
        }
        let newHtml = doc.body.innerHTML;
        // 작성되어있는 데이터의 복사본을 만들어서 api보내기
        newPostData = { ...postData, content: newHtml, imgUrl: presignedUrl.fileName };
      } else {
        console.log("s3Update 실패");
      }
    }
    const response = await fetch("/api/post/new", { method: "POST", body: JSON.stringify(newPostData) });
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

export const putApi = async ({ originalPostData, postData, updateFile, setUpdateFileName, dropDownValue, router }: PutApiType) => {
  // 제목이나 내용이 수정됬는지 확인
  if (originalPostData?.content === postData.content) {
    return alert("수정된 내용이 없습니다.");
  }

  try {
    let newPutData = { ...postData };
    const imgTag = findImgTag(newPutData.content);

    // 만약 content에서 img태그가 삭제됬거나 새로고쳐 졌을때
    if (newPutData.imgUrl && imgTag.length === 0) {
      const deleteS3Image = await fetch(`/api/delete/deleteImage?fileName=${postData.imgUrl}`);
      newPutData = { ...postData, imgUrl: "" };
    }

    if (updateFile) {
      if (newPutData.imgUrl) {
        //기존 s3 이미지 삭제
        const deleteS3Image = await fetch(`/api/delete/deleteImage?fileName=${postData.imgUrl}`);
        setUpdateFileName("");
        console.log(deleteS3Image.status);
      }

      // // Presigned URL 받아오기
      const presignedUrl = await getS3PresignedURL(updateFile);

      // S3 업로드
      let s3UpladRes = await fetch(presignedUrl.url, {
        method: "PUT",
        body: updateFile,
        headers: { "Content-Type": updateFile.type },
      });
      console.log(s3UpladRes);

      if (s3UpladRes.ok) {
        const s3FileUrl = `https://hellostory.s3.ap-northeast-2.amazonaws.com/${presignedUrl.fileName}`;
        // setUpdateSrc(s3FileUrl);
        // postData.content의 img 태그 src 변경
        let parser = new DOMParser();
        let doc = parser.parseFromString(postData.content, "text/html");
        let imgTags = doc.getElementsByTagName("img");
        if (imgTags.length > 0) {
          // 첫 번째 img 태그의 src를 변경
          imgTags[0].src = s3FileUrl;
        }
        let newHtml = doc.body.innerHTML;
        // 작성되어있는 데이터의 복사본을 만들어서 api보내기
        newPutData = { ...postData, content: newHtml, imgUrl: presignedUrl.fileName };

        // console.log(newPutData);
      } else {
        return alert("이미지 업로드를 실패했습니다.");
      }
    }

    const response = await fetch("/api/edit/detailEdit", { method: "PUT", body: JSON.stringify(newPutData) });
    if (response.status !== 200) {
      const errorMessage = await response.json();
      console.log("errorMessage", response.status, errorMessage);
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

export const deleteApi = async ({ getData }: DeleteApiType) => {
  try {
    if (getData?.imgUrl) {
      const deleteS3Image = await fetch(`/api/delete/deleteImage?fileName=${getData.imgUrl}`);
      if (deleteS3Image.status === 200) {
        const result = await deleteS3Image.json();
        console.log(result);
      } else {
        const result = await deleteS3Image.json();
        return console.log(result);
      }
    }
    const response = await fetch("/api/delete/deleteItem", { method: "DELETE", body: getData?._id });
    if (response.status === 200) {
      const result = await response.json();
      console.log(result);
      return result;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const registerApi = async ({ registerData, checkPassword }: RegisterApiType) => {
  try {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
    console.log(passwordPattern.test(registerData.password));

    if (registerData.name === "") {
      return alert("이름이 빈칸 입니다.");
    }
    if (registerData.email === "" || !emailRegex.test(registerData.email)) {
      return alert("유효한 이메일을 입력해주세요.");
    }
    if (registerData.password === "" || !passwordPattern.test(registerData.password)) {
      return alert("유효한 비밀번호를 입력해주세요.");
    }
    if (registerData.password !== checkPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }

    const response = await fetch("/api/auth/signup", { method: "POST", body: JSON.stringify({ ...registerData, checkPassword: checkPassword }) });
    const result = await response.json();

    // console.log(response.status, result);
    if (response.status === 408) {
      return alert("이미 사용중인 닉네임 입니다.");
    }
    if (response.status === 409) {
      return alert("이미 사용중인 이메일 입니다.");
    }
    if (response.status === 500) {
      return alert("잠시 후 다시 시도 바랍니다.");
    }
    return response.status;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postCommentApi = async ({ commentValue, itemId, grandParentId }: CommentValueType) => {
  try {
    if (commentValue.author === "") {
      return alert("닉네임을 입력해주세요.");
    }
    if (commentValue.password === "") {
      return alert("비밀번호를 입력해주세요.");
    }
    if (commentValue.comment === "") {
      return alert("댓글을 입력해주세요.");
    }
    // console.log({ commentValue, itmeId: itemId });

    const response = await fetch("/api/comment/new", { method: "POST", body: JSON.stringify({ commentValue, itmeId: itemId, grandParentId: grandParentId }) });
    const resJson = await response.json();
    const resStatus = await response.status;

    return { resStatus: resStatus, resJson: resJson };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const getCommentApi = async (itemId: string) => {
  try {
    const response = await fetch(`/api/comment/list?itemId=${itemId}`);
    const resJson = await response.json();
    const resStatus = await response.status;

    return { resStatus: resStatus, resJson: resJson };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const commentDeleteApi = async (itemId: string, commentPw: string) => {
  try {
    const response = await fetch("/api/comment/delete", { method: "DELETE", body: JSON.stringify({ itemId: itemId, commentPw: commentPw }) });

    const resJson = await response.json();
    const resStatus = await response.status;

    return { resStatus: resStatus, resJson: resJson };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
