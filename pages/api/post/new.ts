import { ServerPropsType } from "@/src/type/types";
import { connectDB } from "@/src/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (...[req, res]: ServerPropsType) => {
  if (req.method === "POST") {
    if (JSON.parse(req.body).title === "" || JSON.parse(req.body).content === "") {
      return res.status(500).json("제목과 내용 빈칸");
    }
    try {
      const reqData = JSON.parse(req.body);
      const now = new Date();
      const session = await getServerSession(req, res, authOptions);
      // console.log(session);

      now.setHours(now.getHours() + 9);
      reqData.modificationDate = now.toISOString();
      reqData.author = session.user.name;

      // console.log(reqData);
      const db = (await connectDB).db("hellostory");
      const result = db.collection("post").insertOne(reqData);
      return res.status(200).json("ok");
    } catch (error) {
      return res.status(500).json({ error: "mongoDB 오류" });
    }

    // return res.status(200);
  }
};

export default handler;

// 만약 사진이 들어온다면 img 태그의 src 속성값을 찾아서 S3 URL로 교체한 뒤 mongoDB에 저장

// 예시
// app.post('/api/post/new', upload.single('image'), async (req, res) => {
//   let postData = JSON.parse(req.body.postData);
//   if (postData.title === "" || postData.content === "") {
//     return res.status(500).json("제목과 내용 빈칸");
//   }

//   try {
//     // If image is uploaded
//     if (req.file) {
//       const parser = new DOMParser();
//       const doc = parser.parseFromString(postData.content, 'text/html');
//       const img = doc.querySelector('img');
//       if (img) {
//         img.src = req.file.location;
//         postData.content = doc.body.innerHTML;
//       }
//     }

//     const db = (await connectDB).db("hellostory");
//     const result = db.collection("post").insertOne(postData);
//     return res.status(200).json({ message: 'Post created successfully.' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: 'An error occurred while creating the post.' });
//   }
// });

// DOMParser를 사용해서 postData.content의 HTML을 파싱하고, 그 중에서 img 태그를 찾아서 src 속성을 변경합니다. 변경된 HTML은 다시 postData.content에 저장.
