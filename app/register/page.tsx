"use client";

import { Button } from "@/components";
import { RegisterDataType } from "@/src/type/types";
import { registerApi } from "@/src/util/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterDataType>({ name: "", email: "", password: "" });
  const [checkPassword, setCheckPassword] = useState("");

  const router = useRouter();

  const handleClickRegister = async () => {
    const response = await registerApi({ registerData, checkPassword });
    if (response === 200) {
      router.push("/login");
    }
  };

  const handleReset = () => {
    setRegisterData({ name: "", email: "", password: "" });
    setCheckPassword("");
  };

  return (
    <div className="flex justify-center mt-40">
      <div className="inline-flex flex-col p-11 border-[1px] border-[#c9c9c9] text-xs sm:text-sm md:text-base lg:text-lg">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-b">회원 가입</h1>
        <div className="mb-4 font-b">
          <span className="text-orange">Hello Story</span>에 오신 여러분 환영합니다.
        </div>
        <p className="flex flex-row-reverse mb-2 font-r text-red text-[10px] sm:text-[10px] md:text-xs lg:text-sm">*모두 필수로 작성해주세요.</p>
        <div className="flex items-center">
          <p className="p-2 text-red">*</p>
          <input
            type="text"
            name="name"
            placeholder="닉네임"
            value={registerData.name}
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-2 border-[1px] border-[#c9c9c9] rounded-lg"
            onChange={(e) => {
              setRegisterData((prevRegisterData) => ({ ...prevRegisterData, name: e.target.value }));
            }}
          />
        </div>

        <div className="flex items-center">
          <p className="p-2 text-red">*</p>
          <input
            type="text"
            name="email"
            placeholder="아이디(이메일 형식)"
            value={registerData.email}
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-2 border-[1px] border-[#c9c9c9] rounded-lg"
            onChange={(e) => {
              setRegisterData((prevRegisterData) => ({ ...prevRegisterData, email: e.target.value }));
            }}
          />
        </div>
        <div className="flex items-center">
          <p className="p-2 text-red">*</p>
          <input
            type="password"
            name="password"
            placeholder="비밀번호(영문 숫자 조합, 6자 이상 15자 이하)"
            value={registerData.password}
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-2 border-[1px] border-[#c9c9c9] rounded-lg"
            onChange={(e) => {
              setRegisterData((prevRegisterData) => ({ ...prevRegisterData, password: e.target.value }));
            }}
          />
        </div>
        <div className="flex items-center">
          <p className="p-2 text-red">*</p>
          <input
            type="password"
            name="password"
            placeholder="비밀번호 확인"
            value={checkPassword}
            className="w-64 sm:w-72 md:w-80 lg:w-96 py-2 pl-4 mb-6 border-[1px] border-[#c9c9c9] rounded-lg"
            onChange={(e) => {
              setCheckPassword(e.target.value);
            }}
          />
        </div>
        <div className="flex justify-center">
          <Button bg="bg-white border-[1px] border-[#c9c9c9]" px="p-4 mr-2" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-[#808080]" handler={handleReset}>
            다시 작성하기
          </Button>
          <Button bg="bg-orange border-[1px] border-orange" px="py-4 px-8" textSize="text-xs sm:text-sm md:text-base lg:text-lg" textColor="text-white" handler={handleClickRegister}>
            가입하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
