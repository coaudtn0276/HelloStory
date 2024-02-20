"use client";

import { Button } from "@/components";
import { githubIcon, kakaoIcon, naverIcon } from "@/public/image";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });
  const [providers, setProviders] = useState(null);
  console.log(providers);

  const router = useRouter();

  const handleLogin = async () => {
    const result = await signIn("credentials", {
      email: loginInfo.email,
      password: loginInfo.password,
      redirect: false,
      //   callbackUrl: "/",
    });
    // console.log(result);
    if (result?.status !== 200) {
      return alert("메일 혹은 패스워드를 확인 바랍니다.");
    }
    return router.push("/");
  };

  const handleAuthLogin = async (value: string) => {
    const result = await signIn(value, {
      redirect: true,
      callbackUrl: "/",
    });
  };

  useEffect(() => {
    (async () => {
      const res: any = await getProviders();
      console.log(res);
      setProviders(res);
    })();
  }, []);

  return (
    <div className="flex justify-center mt-40">
      <div className="inline-flex flex-col p-14 border-[1px] border-[#c9c9c9] text-xs sm:text-sm md:text-base lg:text-lg">
        <div className="flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-b">로그인</h1>
          <div className="mb-4 font-b">
            <span className="text-orange">Hello Story</span>에 오신 여러분 환영합니다.
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="email"
            name="email"
            placeholder="아이디(이메일 형식)"
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-2 border-[1px] border-[#c9c9c9] rounded-lg"
            value={loginInfo.email}
            onChange={(e) => {
              setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, email: e.target.value }));
            }}
          />
        </div>
        <div className="flex items-center">
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-6 border-[1px] border-[#c9c9c9] rounded-lg"
            value={loginInfo.password}
            onChange={(e) => {
              setLoginInfo((prevLoginInfo) => ({ ...prevLoginInfo, password: e.target.value }));
            }}
          />
        </div>

        <div className="flex justify-center">
          <Link href={"/register"}>
            <Button bg="bg-white border-[1px] border-[#c9c9c9]" px="py-4 px-8 mr-2" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-[#808080]">
              가입하기
            </Button>
          </Link>

          <Button bg="bg-orange border-[1px] border-orange" px="py-4 px-10" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-white" handler={handleLogin}>
            로그인
          </Button>
        </div>
        <div className="flex justify-center">
          <div className="mt-8 w-10/12 flex justify-around">
            <Image
              src={githubIcon}
              alt="githubIcon"
              className="w-12 sm:w-12 md:w-14 lg:w-16 cursor-pointer"
              onClick={() => {
                handleAuthLogin("github");
              }}
            />
            <Image
              src={kakaoIcon}
              alt="githubIcon"
              className="w-12 sm:w-12 md:w-14 lg:w-16 cursor-pointer"
              onClick={() => {
                handleAuthLogin("kakao");
              }}
            />
            <Image
              src={naverIcon}
              alt="githubIcon"
              className="w-12 sm:w-12 md:w-14 lg:w-16 cursor-pointer"
              onClick={() => {
                handleAuthLogin("naver");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
