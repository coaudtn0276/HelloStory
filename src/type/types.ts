import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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
};

export type ServerPropsType = Parameters<(req: NextApiRequest, res: NextApiResponse) => void>;
