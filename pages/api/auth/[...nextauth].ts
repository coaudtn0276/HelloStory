import NextAuth, { SessionStrategy } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcrypt";

import { connectDB } from "@/src/util/database";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GIT_CLIENT_ID || "",
      clientSecret: process.env.GIT_Client_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("hellostory");
        let user = await db.collection("user_cred").findOne({ email: credentials?.email });
        if (!user) {
          console.log("해당 이메일은 없습니다.");
          return null;
        }
        if (!credentials || !credentials.password) {
          console.log("비밀번호가 제공되지 않았습니다.");
          return null;
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          console.log("비번틀림");
          return null;
        }
        return { id: user._id.toString(), name: user.name, email: user.email, role: user.role, image: user.image };
      },
    }),
  ],
  // /login페이지로 이동
  pages: {
    signIn: "/login",
  },

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }: { token: any; user: any }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }: { session: any; token: any }) => {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);
