import { PageList } from "@/components";
import { PostDocument } from "@/src/type/types";
import { connectDB } from "@/src/util/database";

export const dynamic = "force-dynamic";

const Game = async () => {
  const db = (await connectDB).db("hellostory");
  let data = await db.collection<PostDocument>("post").find({ category: "game" }).sort({ _id: -1 }).toArray();

  // console.log(data);

  data = JSON.parse(JSON.stringify(data));

  // console.log("gameData", data);

  return (
    <div>
      <PageList data={data} containerTitle="게임" />
    </div>
  );
};

export default Game;
