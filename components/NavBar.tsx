"use client";

import Link from "next/link";
import Button from "./Button";
import Image from "next/image";
import { postImg, searchImg } from "@/public/image";

import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { NavBarType } from "@/src/type/types";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { NavParamsAtom } from "@/recoil/NavParamsAtom";

const NavBar: React.FC<NavBarType> = () => {
  const [activeLink, setActiveLink] = useRecoilState(NavParamsAtom);
  // console.log(activeLink);
  const [searchValue, setSearchValue] = useState("");

  const session = useSession();
  const router = useRouter();

  // const [test, setTest] = useRecoilState(NavParamsAtom);
  // console.log(test);

  // const handleActiveClick = (path: string) => {
  //   setActiveLink(path);
  // };

  const handleSearch = () => {
    if (searchValue === "") {
      return alert("검색어를 입력해주세요.");
    }
    const encodedSearchValue = encodeURIComponent(searchValue);

    router.push(`/search/${encodedSearchValue}`);
    setSearchValue("");
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row-reverse pt-2 mr-2 font-b text-xs sm:text-sm md:text-base lg:text-lg ">
        <div>
          {session.data !== null ? (
            <button
              className="mr-4 text-orange"
              onClick={() => {
                signOut();
              }}
            >
              로그아웃
            </button>
          ) : (
            <button
              className="mr-4 text-orange"
              onClick={() => {
                signIn();
              }}
            >
              로그인
            </button>
          )}

          <Link href={"/register"}>회원가입</Link>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <Link
          href={"/"}
          className="font-nico mx-2 text-sm sm:text-base md:text-xl lg:text-2xl"
          onClick={() => {
            setActiveLink("/");
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
        <div className="flex justify-evenly w-1/2 font-b text-xs sm:text-sm md:text-base lg:text-lg">
          <Link
            href={"/"}
            className={`${activeLink === "/" && "text-orange"}`}
            onClick={() => {
              setActiveLink("/");
            }}
          >
            홈
          </Link>
          <Link
            href={"/game"}
            className={`${activeLink === "/game" && "text-orange"}`}
            onClick={() => {
              setActiveLink("/game");
            }}
          >
            게임
          </Link>
          <Link
            href={"/restaurant"}
            className={`${activeLink === "/restaurant" && "text-orange"}`}
            onClick={() => {
              setActiveLink("/restaurant");
            }}
          >
            맛집
          </Link>
          <Link
            href={"/pet"}
            className={`${activeLink === "/pet" && "text-orange"}`}
            onClick={() => {
              setActiveLink("/pet");
            }}
          >
            반려동물
          </Link>
          <Link
            href={"/chat"}
            className={`${activeLink === "/chat" && "text-orange"}`}
            onClick={() => {
              setActiveLink("/chat");
            }}
          >
            잡담
          </Link>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <Link href={"/write"} className="mr-2">
            <Button bg="bg-orange" px="px-4" textSize="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs" textColor="text-white">
              <span className="flex items-center">
                <Image src={postImg} alt="postImg" className="w-2 sm:w-2 md:w-3 lg:w-4 h-2 sm:h-2 md:h-3 lg:h-4 mr-2" />새 글 게시
              </span>
            </Button>
          </Link>
          <Link href={"/mypost"} className="mr-2">
            <Button bg="bg-gray-primary" px="px-4" textSize="text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs" textColor="text-white">
              내가 쓴 글 보기
            </Button>
          </Link>
        </div>

        <div className="flex justify-between items-center w-7/12 h-8 px-2 border-2 border-gray-primary rounded-md">
          <input
            type="text"
            className="font-b w-full outline-none text-[6px] sm:text-[8px] md:text-[10px] lg:text-xs placeholder-[#d6d6d6] "
            placeholder="궁금한 이야기를 검색해보세요."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button onClick={handleSearch}>
            <Image src={searchImg} alt="searchImg" className="w-3 sm:w-4 md:w-5 lg:w-4 h-3 sm:h-4 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
