import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "next-auth";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
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
  _id: string;
};

export type NavBarType = {
  session?: Session | null;
};

export type HotStoryProps = {
  data: PostDocument[];
  containerTitle: string;
};

export type MyPageListProps = {
  data: PostDocument[];
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

export type ParamsType = {
  Bucket: string;
  Key: string;
};

export type ModalProps = {
  checkHandler: (e: React.MouseEvent) => void;
  deleteHandler: () => void;
};

export type PostApiType = {
  postData: DataType;
  updateFile: File | null | undefined;
  dropDownValue: string;
  router: AppRouterInstance;
};

export type PutApiType = {
  originalPostData: DataType;
  postData: DataType;
  updateFile: File | null | undefined;
  setUpdateFileName: (name: string) => void;
  dropDownValue: string;
  router: AppRouterInstance;
};

export type DeleteApiType = {
  getData: PostDocument | undefined;
};

export type DeleteSuccessType = {
  handler: () => void;
};

export type RegisterDataType = {
  name: string;
  email: string;
  password: string;
};

export type CommentListType = {
  itemId: string;
};

export type RegisterApiType = {
  registerData: RegisterDataType;
  checkPassword: string;
};

export type CommentValueType = {
  commentValue: {
    author: string;
    password: string;
    comment: string;
  };
  itemId: string;
};

export type CommentDataType = {
  author: string;
  comment: string;
  modificationDate: string;
  parent: string;
  password: string;
  _id: string;
};

export type ChildCommentDataType = CommentDataType & {
  grand_parent: string;
};

export type ChildCommentListType = {
  childData: ChildCommentDataType[];
};
