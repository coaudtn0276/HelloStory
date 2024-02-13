import { ParamsType, ServerPropsType } from "@/src/type/types";
import aws from "aws-sdk";

const handler = async (...[req, res]: ServerPropsType) => {
  aws.config.update({
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
    region: "ap-northeast-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();

  // console.log(req.query);

  const fileName = req.query.fileName?.toString();
  const bucketName = process.env.BUCKET_NAME;
  if (fileName && bucketName) {
    const params: ParamsType = {
      Bucket: bucketName,
      Key: fileName,
    };
    s3.deleteObject(params, (err, data) => {
      if (err) {
        console.log(err, err.stack); // 오류 발생 시
        return res.status(500).json({ error: "Failed to delete image" });
      } else {
        console.log(data); // 성공 시
        return res.status(200).json({ success: true });
      }
    });
  }
};

export default handler;
