import { ObjectId } from "mongodb";

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

export type PostDocument = {
  _id: ObjectId;
  title: string;
  content: string;
  category: string;
  author: string;
  imgUrl: string;
  modificationDate: string;
  views: number;
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
