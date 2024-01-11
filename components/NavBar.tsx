"use client";

import Link from "next/link";
import { useState } from "react";
import Button from "./Button";
import Image from "next/image";
import { postImg, searchImg } from "@/public/image";

const NavBar: React.FC = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleActiveClick = (path: string) => {
    setActiveLink(path);
  };

  return (
    <div className="flex flex-col border-2 border-red">
      <div className="flex flex-row-reverse pt-2 mr-2 font-b text-sm">
        <div>
          <span className="mr-4 text-orange">로그인</span>
          회원가입
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Link
          href={"/"}
          className="font-nico mx-2 text-2xl"
          onClick={() => {
            handleActiveClick("/");
          }}
        >
          <p className="-mb-2">
            <span className="text-orange">H</span>
            ello
          </p>
          <p>
            <span className="text-orange">S</span>
            tory
          </p>
        </Link>
        <div className="flex justify-evenly w-1/2 font-b text-sm">
          <Link
            href={"/"}
            className={`${activeLink === "/" && "text-orange"}`}
            onClick={() => {
              handleActiveClick("/");
            }}
          >
            홈
          </Link>
          <Link
            href={"/game"}
            className={`${activeLink === "/game" && "text-orange"}`}
            onClick={() => {
              handleActiveClick("/game");
            }}
          >
            게임
          </Link>
          <Link
            href={"/restaurant"}
            className={`${activeLink === "/restaurant" && "text-orange"}`}
            onClick={() => {
              handleActiveClick("/restaurant");
            }}
          >
            맛집
          </Link>
          <Link
            href={"/pet"}
            className={`${activeLink === "/pet" && "text-orange"}`}
            onClick={() => {
              handleActiveClick("/pet");
            }}
          >
            반려동물
          </Link>
          <Link
            href={"/chat"}
            className={`${activeLink === "/chat" && "text-orange"}`}
            onClick={() => {
              handleActiveClick("/chat");
            }}
          >
            잡담
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <Button bg="bg-orange" px="px-5" py="py-2" textSize="text-xs" textColor="text-white">
          <span className="flex items-center">
            <Image src={postImg} alt="postImg" className="w-4 h-4 mr-2" />새 글 게시
          </span>
        </Button>

        <Button bg="bg-gray-primary" px="px-5" py="py-2" textSize="text-xs" textColor="text-white">
          내가 쓴 글 보기
        </Button>
        <form action="submit" className="flex justify-between items-center w-96 h-8 px-2 border-2 border-gray-primary rounded-md">
          <input type="text" className="font-b w-2/3 text-xs placeholder-[#d6d6d6] " placeholder="궁금한 이야기를 검색해보세요." />
          <button type="submit">
            <Image src={searchImg} alt="searchImg" className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NavBar;
