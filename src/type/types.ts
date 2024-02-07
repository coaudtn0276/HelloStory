import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Dispatch, SetStateAction } from "react";

export type ButtonType = {
  children: React.ReactNode;
  bg: string;
  px: string;
  py?: string;
  textSize: string;
  textColor: string;
  handler?: () => void;
};

export type ArrowPropsTyps = {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export type ArrowType = {
  color: string;
};

export type DataType = {
  title: string;
  content: string;
  category: string;
  author: string;
  imgUrl: string;
  modificationDate: string;
  views: number;
};

export type PostDocument = DataType & {
  _id: ObjectId;
};

export type HotStoryProps = {
  data: PostDocument[];
  containerTitle: string;
};

export type PageListProps = {
  data: PostDocument[];
  containerTitle: string;
};

export type DropDownProps = {
  dropDownList?: string[];
  onValueChange: Dispatch<SetStateAction<string>>;
  putCategorey?: string;
};

export type ServerPropsType = Parameters<(req: NextApiRequest, res: NextApiResponse) => void>;

export type itemIdProps = {
  params: {
    itemId: string;
  };
  searchParams: string;
};

export type PresignedUrlResponse = {
  url: string;
  fields: {
    Policy: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    "X-Amz-Signature": string;
    bucket: string;
    key: string;
  };
};
