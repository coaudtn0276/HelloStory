export { default } from "next-auth/middleware";

// 로그인이 필요한 페이지
export const config = {
  matcher: ["/mypost", "/write"],
};

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/write") || request.nextUrl.pathname.startsWith("/mypost")) {
//     console.log("nextUrl", request.url);
//     console.log("request.cookies", request.cookies);

//     const session = await getToken({ req: request });
//     console.log("세션", session);
//     if (session === null) {
//       return NextResponse.redirect(new URL("/api/auth/signin", request.url));
//     }
//   }
// }
