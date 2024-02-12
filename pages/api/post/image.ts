import { ServerPropsType } from "@/src/type/types";
import aws from "aws-sdk";
import { v4 } from "uuid";
export const handler = async (...[req, res]: ServerPropsType) => {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  // const url = await s3.createPresignedPost({
  //   Bucket: process.env.BUCKET_NAME,
  //   Fields: { key: req.query.file },
  //   Expires: 60, // seconds
  //   Conditions: [
  //     ["content-length-range", 0, 1048576], //파일용량 1MB 까지 제한
  //   ],
  // });

  // console.log(req.query);

  const uniqueFileName = `${v4()}.${req.query.fileName}`;
  // console.log(uniqueFileName);

  const url = await s3.getSignedUrl("putObject", {
    Bucket: process.env.BUCKET_NAME,
    Key: uniqueFileName,
    ContentType: req.query.fileType,
    Expires: 60, // seconds
  });

  res.status(200).json({ url: url, fileName: uniqueFileName });
};

export default handler;
