import { PresignedUrlResponse } from "../type/types";

export const getS3PresignedURL = async (file: File) => {
  const filename = encodeURIComponent(file.name);
  const fileType = file.type;
  let res = await fetch(`/api/post/image?fileName=${filename}&fileType=${fileType}`);
  const data = await res.json();
  return data;
};
