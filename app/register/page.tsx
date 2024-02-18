"use client";

import { RegisterDataType } from "@/src/type/types";
import { registerApi } from "@/src/util/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterDataType>({ name: "", email: "", password: "" });

  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  console.log(emailRegex.test(registerData.email));

  const router = useRouter();

  const handleClickRegister = async () => {
    const response = await registerApi({ registerData });
    if (response === 200) {
      router.push("/");
    }
  };

  return (
    <div>
      <input
        type="text"
        name="name"
        placeholder="이름"
        value={registerData.name}
        onChange={(e) => {
          setRegisterData((prevRegisterData) => ({ ...prevRegisterData, name: e.target.value }));
        }}
      />
      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={registerData.email}
        onChange={(e) => {
          setRegisterData((prevRegisterData) => ({ ...prevRegisterData, email: e.target.value }));
        }}
      />
      <input
        type="password"
        name="password"
        placeholder="비밀번호"
        value={registerData.password}
        onChange={(e) => {
          setRegisterData((prevRegisterData) => ({ ...prevRegisterData, password: e.target.value }));
        }}
      />
      <button type="submit" onClick={handleClickRegister}>
        id/pw 가입요청
      </button>
    </div>
  );
};

export default Register;
