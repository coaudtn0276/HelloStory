import { connectDB } from "@/src/util/database";

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  const test = await db.collection("post").find().toArray();
  console.log(test);

  return <div>메인페이지</div>;
}
