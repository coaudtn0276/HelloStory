import { PresignedUrlResponse } from "../type/types";

export const getS3PresignedURL = async (fileName: string): Promise<PresignedUrlResponse> => {
  const filename = encodeURIComponent(fileName);
  let res = await fetch(`/api/post/image?file=${filename}`);
  const data: PresignedUrlResponse = await res.json();
  return data;
};
