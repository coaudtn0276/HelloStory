import { connectDB } from "@/src/util/database";

export default async function Home() {
  const db = (await connectDB).db("hellostory");
  const game = await db.collection("game").find().toArray();
  const chat = await db.collection("chat").find().toArray();
  const pet = await db.collection("pet").find().toArray();
  const restaurant = await db.collection("restaurant").find().toArray();
  console.log(game[0].title);

  return <div>메인페이지</div>;
}
