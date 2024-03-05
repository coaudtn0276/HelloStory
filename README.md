# Hello Story

## 프로젝트

### 개요

- Next.js를 이용한 풀스텍 커뮤니티 게시판.

## 프로젝트 기술 스택

### Environments

<img src="https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white"> <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">

### Development Stack

<img src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/tailwindcss-0F172A?&logo=tailwindcss"> <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white"> <img src="https://img.shields.io/badge/Recoil-3578E5?style=for-the-badge&logo=recoil&logoColor=white" />
<img src="https://img.shields.io/badge/nextauth-646CFF?style=for-the-badge&logo=nextauth&logoColor=white"> <img src="https://img.shields.io/badge/reactquill-764ABC?style=for-the-badge&logo=reactquill&logoColor=white"> <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"> <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">

<img src="https://img.shields.io/badge/mongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/amazonaws elastic beanstalk-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=for-the-badge&logo=amazons3&logoColor=white">

## 프로젝트 진행 과정

- 피그마를 이용해 목업 디자인 스케치와 메인 디자인
- 요구사항별 API작성
- 기능 구현
- 배포 테스트 및 기능 수정
- 배포

## 프로젝트 구현 내용

### 클라리언트

#### 회원가입 페이지

<p align="center">
<img width="606" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/b6192158-45c3-4ab6-acde-d7670ab12ce3">
</p>

- 닉네임과 메일형식으로 회원가입.

#### 로그인 페이지

<p align="center">
<img width="601" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/33b52b06-48ee-429a-9d27-2493bdf77272">
</p>

- next-auth 라이브러리를 이용헤 가입한 메일과 비밀번호 로그인과 소셜 로그인 두가지 방식으로 로그인 가능.
- 로그인을 완료하면 사용자에게 JWT를 발급. 이 토큰은 사용자의 세션 정보를 담고 있으며, 서버에 요청을 보낼 때마다 토큰을 함께 보냄으로써 사용자를 인증.

#### 글 게시 페이지

<p align="center">
<img width="601" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/d81457a0-f7f6-4d2a-9279-fc8f0d83527a">
</p>

- 사용자가 로그인하지 않은 상태에서 접근 시, 자동으로 로그인 페이지로 이동.
- 사용자가 글 작성 시 카테고리를 선택하면, 해당 글은 선택한 카테고리에 맞게 저장.
- 'react-quill' 라이브러리를 활용하여 사용자의 글 작성 및 수정 과정을 매우 직관적이고 편리하게 만듦. 이 도구를 통해 사용자는 쉽게 텍스트를 스타일링하고, 유연하게 내용을 조절 가능.
- 대용량 이미지 저장에는 AWS S3의 Presigned URL 방식을 적용하여 서버의 리소스 낭비를 크게 줄임. 이 방식을 통해 클라이언트가 직접 S3에 이미지를 업로드하도록 하여 서버의 부하를 감소.
- 사용자 인터페이스 단에서는 미리보기 이미지를 활용. 사용자가 '작성 완료' 버튼을 클릭할 때만 S3에 이미지가 업로드되도록 설정하여, 불필요한 이미지 업로드를 최소화. 이를 통해 효율적인 리소스 관리와 사용자 경험 향상을 동시에 이루는 효과를 얻음.

#### 메인 페이지

<p align="center">
<img width="604" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/30ea18b2-1634-4a07-9cc2-92bb42d41de6">
</p>
<p align="center">
<img width="604" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/49f9c24f-cde0-4c68-b51b-7fdb4ecb68ba">
</p>

- 메인 페이지는 사용자들이 생성한 다양한 게시물 중에서 이미지가 첨부된 글, 조회수가 높은 글, 가장 최근에 게시된 글 등을 우선적으로 화면에 노출.
- 페이지의 크기가 일정 수준 이하로 줄어들면, 'react-items-carousel' 라이브러리를 활용하여 이미지가 포함된 사용자 게시물을 캐러셀 형태로 변환.
- 네비게이션 바에 내장된 검색 기능을 통해 사용자는 전체 게시물을 제목과 내용 기준으로 검색할 수 있음. 이를 통해 원하는 정보를 빠르고 효율적으로 찾아볼 수 있음.

#### 카테고리별 페이지

<p align="center">
<img width="604" alt="스크린샷" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/795d7a8d-1444-47fe-9828-1648aea53f33">
</p>

- 네비게이션 바에서 카테고리를 선택하면 해당 카테고리에 작성된 게시글들이 화면에 표시.
- 사용자는 게시글의 제목을 클릭하여 해당 게시글의 상세 정보를 열람.
- 검색 필터를 활용해 현재 보고 있는 카테고리 내에서 원하는 조건에 맞는 게시글을 효과적으로 검색할 수 있음.
- '인기 순서 정렬' 버튼을 클릭하면, 사용자는 조회수를 기준으로 게시글을 정렬할 수 있음. 이를 통해 인기 있는 게시글을 신속하게 확인 가능.

#### 상세 페이지

<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/967588f0-67cf-4e17-b0fa-42c1a93a0e2f"> 
</p>

- 사용자는 각 카테고리별 게시글 제목을 클릭하면 해당 게시글의 상세 정보를 확인가능.
- 게시글 작성자 본인이 자신의 게시글을 조회할 경우, 수정 및 삭제 버튼이 표시되며 이를 통해 게시글을 관리.
- 'Role-Based Access Control' 기능이 추가되어, 관리자 계정은 모든 게시글 및 댓글을 수정하거나 삭제할 수 있는 권한을 가짐.
- 사용자는 로그인하지 않아도 댓글과 대댓글을 등록가능.
- 로그인한 사용자의 경우 댓글과 대댓글 작성 시 닉네임이 자동으로 고정.

#### 내가 쓴 글 보기 페이지

<p align="center">
<img width="70%" alt="스크린샷 2023-08-02 오후 3 50 17" src="https://github.com/coaudtn0276/HelloStory/assets/124559717/76576815-6019-42ca-892b-2d6ac7d452a1"> 
</p>

- 사용자가 로그인하지 않은 상태에서 접근 시, 자동으로 로그인 페이지로 이동.
- 사용자는 자신이 작성한 게시글의 수를 확인할 수 있고 필요에 따라 게시글을 수정하거나 삭제할 수 있음.
- 검색 필터를 활용해 내가 쓴 글 내에서 원하는 조건에 맞는 게시글을 효과적으로 검색할 수 있음.

### 서버

- 게시글과 사용자 정보는 MongoDB에 보관하여 데이터 관리.
- 이미지와 같은 용량이 큰 파일의 경우 Presigned URL 방식을 적용하여 서버의 리소스 낭비를 줄임.

### API

#### /api/get/items

Endpoint

- /api/post/items

HTTP Method

- GET

Description

- 특정 게시글의 정보를 조회하고, 해당 게시글의 조회수를 1 증가.

Request Query Parameters

- itemId: 조회하려는 게시글의 ID를 문자열로 전달해야 함.
  Response:

- 성공 시 200 OK 상태 코드와 함께 조회한 게시글의 정보를 JSON 형식으로 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/post/new

Endpoint

- /api/post/new

HTTP Method

- POST

Description

- 새로운 게시글을 생성.

Request Header:

- 인증 정보: 사용자의 세션 정보가 필요.

Request Body

- JSON 형식으로 데이터를 전송해야 함.
- title: 게시글의 제목을 문자열로 전달해야 함. 빈 문자열을 전달하면 에러가 발생.
- content: 게시글의 내용을 문자열로 전달해야 함. 빈 문자열을 전달하면 에러가 발생.

Response

- 성공 시 200 OK 상태 코드와 함께 "ok" 메시지를 반환.
- 요청 본문의 title 또는 content가 빈 문자열인 경우, 500 Internal Server Error 상태 코드와 함께 "제목과 내용 빈칸" 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/post/image

Endpoint

- /api/post/image

HTTP Method

- PUT

Description

- 이미지 파일을 업로드하기 위한 Presigned URL을 생성.

Request Query Parameters:

- fileName: 업로드할 이미지 파일의 이름을 문자열로 전달해야 함.
- fileType: 업로드할 이미지 파일의 타입을 문자열로 전달해야 함.
  Request Body

Response

성공 시 200 OK 상태 코드와 함께 다음과 같은 JSON 데이터를 반환.

- url: 이미지 파일을 업로드할 수 있는 Presigned URL.
- fileName: 이미지 파일의 고유한 파일 이름. 이 이름은 서버에서 생성된 UUID를 기반으로 함.

#### /api/post/detailEdit

Endpoint

- /api/post/detailEdit

HTTP Method

- PUT

Description

- 특정 게시글의 내용을 수정. 게시글의 작성자 또는 'admin' 권한을 가진 사용자만이 수정할 수 있음.

Request Body

- JSON 형식으로 데이터를 전송해야 함.
- \_id: 수정하려는 게시글의 ID를 문자열로 전달해야 합.
- content: 수정하려는 게시글의 새로운 내용을 문자열로 전달해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 "ok" 메시지를 반환.
- 수정하려는 내용이 기존 게시글의 내용과 동일한 경우, 400 Bad Request 상태 코드와 함께 "내용수정이 없습니다." 메시지를 반환.
- 게시글의 작성자나 'admin' 권한을 가진 사용자가 아닌 경우, 403 Forbidden 상태 코드와 함께 "접근 권한 없음." 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/delete/deleteItem

Endpoint

- /api/delete/deleteItem

HTTP Method

- DELETE

Description

- 특정 게시글과 그에 연관된 모든 댓글을 삭제. 게시글의 작성자 또는 'admin' 권한을 가진 사용자만이 삭제할 수 있음.

Request Body

- 삭제하려는 게시글의 ID를 문자열로 전달해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 "success" 메시지를 반환.
- 게시글의 작성자나 'admin' 권한을 가진 사용자가 아닌 경우, 403 Forbidden 상태 코드와 함께 "접근 권한 없음" 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "DB에러" 오류 메시지를 반환.

#### /api/delete/deleteItem

Endpoint

- /api/delete/deleteImage

HTTP Method

- DELETE

Description

- S3 버킷에서 특정 이미지를 삭제.

Request Query Parameters

- fileName: 삭제하려는 이미지의 파일 이름을 문자열로 전달해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 "{ success: true }" 메시지를 반환.
- 이미지 삭제 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'Failed to delete image' }" 오류 메시지를 반환.

#### /api/commnet/new

Endpoint

- /api/comment/new

HTTP Method

- POST

Description

- 새로운 댓글을 생성.

Request Body

- JSON 형식으로 데이터를 전송해야 함.
- commentValue: 댓글로 등록할 내용을 포함하는 객체. 이 객체는 author(작성자), password(비밀번호), comment(댓글 내용) 필드를 포함해야 함. 모든 필드는 문자열로 전달해야 함.
- itemId: 댓글을 추가하려는 게시글의 ID를 문자열로 전달해야 함.
- grandParentId (선택적): 대댓글을 추가하려는 경우, 부모 댓글의 ID를 문자열로 전달해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 등록한 댓글의 정보를 JSON 형식으로 반환.
- commentValue.author, commentValue.password, commentValue.comment 중 하나라도 빈 문자열인 경우, 400 Bad Request 상태 코드와 함께 각각 "닉네임 공백", "비밀번호 공백", "댓글 공백" 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/commnet/list

Endpoint

- /api/comment/list

HTTP Method

- GET

Description

- 특정 게시글에 대한 모든 부모 댓글과 자식 댓글(대댓글)을 조회.

Request Query Parameters

- itemId: 댓글을 조회하려는 게시글의 ID를 문자열로 전달해야 합니다.

Response

- 성공 시 200 OK 상태 코드와 함께 조회한 댓글의 정보를 JSON 형식으로 반환. 반환되는 JSON 객체는 parentArray(부모 댓글 배열)과 childArray(자식 댓글 배열) 두 개의 필드를 포함.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/commnet/delete

Endpoint

- /api/comment/delete

HTTP Method

- DELETE

Description

- 특정 댓글과 그에 연관된 모든 자식 댓글(대댓글)을 삭제. 댓글 작성자 또는 'admin' 권한을 가진 사용자만이 삭제할 수 있음.

Request Body

- JSON식으로 데이터를 전송해야 함.
- itemId: 삭제하려는 댓글의 ID를 문자열로 전달해야 함.
- postId: 삭제하려는 댓글이 속한 게시글의 ID를 문자열로 전달해야 함.
- commentPw: 삭제하려는 댓글의 비밀번호를 문자로 전달해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 "삭제 완료" 메시지를 반환.
- 입력한 비밀번호가 댓글의 비밀번호와 일치하지 않는 경우, 403 Forbidden 상태 코드와 함께 "비밀번호 틀림" 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "DB에러" 오류 메시지를 반환.

#### /api/auth/signup

Endpoint

- /api/auth/signup

HTTP Method

- POST

Description

- 새로운 사용자를 등록.

Request Body

- JSON 형식으로 데이터를 전송해야 함.
- name: 사용자의 이름을 문자열로 전달해야 함.
- email: 사용자의 이메일을 문자열로 전달해야 함.
- password와 checkPassword: 사용자의 비밀번호와 비밀번호 확인을 문자열로 전달해야 함. 두 값은 일치해야 함.

Response

- 성공 시 200 OK 상태 코드와 함께 "가입 성공" 메시지를 반환.
- name, email, password 중 하나라도 빈 문자열인 경우, 500 Internal Server Error 상태 코드와 함께 각각 "이름 빈칸", "유효한 이메일이 아님", "비밀번호 빈칸" 메시지를 반환.
- password와 checkPassword가 일치하지 않는 경우, 500 Internal Server Error 상태 코드와 함께 "비밀번호가 일치하지 않음" 메시지를 반환.
- 입력한 이름이나 이메일이 이미 등록되어 있는 경우, 각각 408 Request Timeout 상태 코드와 함께 "이름 중복" 메시지, 409 Conflict 상태 코드와 함께 "메일이 중복" 메시지를 반환.
- 데이터베이스 작업 중 오류가 발생한 경우, 500 Internal Server Error 상태 코드와 함께 "{ error: 'mongoDB 오류' }" 오류 메시지를 반환.

#### /api/auth/[...nextauth].ts

Endpoint

- /api/auth/[...nextauth]

Description

- NextAuth 라이브러리를 사용하여 사용자 인증을 처리. Github, Kakao, Naver 및 자격증명 (이메일과 비밀번호) 인증 방식을 지원.

Providers

- Github: Github으로부터 사용자 인증을 받는다. GIT_CLIENT_ID와 GIT_Client_SECRET 환경 변수가 필요.
- Kakao: Kakao로부터 사용자 인증을 받는다. KAKAO_CLIENT_ID와 KAKAO_CLIENT_SECRET 환경 변수가 필요.
- Naver: Naver로부터 사용자 인증을 받는다. NAVER_CLIENT_ID와 NAVER_CLIENT_SECRET 환경 변수가 필요.
- Credentials: 이메일과 비밀번호를 사용하여 사용자 인증을 받는다. 데이터베이스에서 사용자를 조회하고, 비밀번호를 확인.

Sign-in Page

- 로그인 페이지로 /login 경로를 사용.

Session

- jwt 세션 전략을 사용하며, 세션의 최대 유효 기간은 30일.

Callbacks

- jwt: JWT를 생성할 때 실행되는 콜백입니다. 사용자의 이름, 이메일, 역할 정보를 JWT에 포함.
- session: 세션이 조회될 때마다 실행되는 콜백입니다. 세션 객체에 사용자 정보를 추가.
- Secret: JWT의 서명에 사용되는 비밀키로, NEXTAUTH_SECRET 환경 변수를 사용.

### 배포

- AWS Elastic Beanstalk를 활용하여 배포 자동화를 구현. Elastic Beanstalk는 개발자가 애플리케이션을 쉽게 배포하고 관리할 수 있도록 도와주는 AWS의 서비스인데 이를 통해 서버 설정, 네트워크 구성 등의 복잡한 인프라 관리를 자동화하고, 애플리케이션의 배포와 운영에 집중할 수 있었음.

## 프로젝트 한계

#### 한계

- 프로젝트 초기 단계에서는 다중 이미지 업로드 기능을 구현할 계획이었으나 프로젝트를 단독으로 진행하다 보니 알아야할 부분도 많아졌고 그만큼 신경써야 되는 부분이 많아졌음. 우선적으로 이미지 처리는 한 개의 이미지만 업로드하고 수정할 수 있는 방식으로 구현.
