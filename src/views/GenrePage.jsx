import { useLoaderData, useParams } from "react-router";
import GameList from "../components/HomeComponents/GameList";

export default function GenrePage() {
  const games = useLoaderData();
  const { slug } = useParams();

  return (
    <>
      <div className="container mx-auto px-4 mt-6 font-roboto">
        <h1 className="text-center md:text-left text-2xl md:text-3xl font-electro tracking-wider text-white uppercase mb-8 border-b border-[#2d3139] pb-4">
          Genre:
          <span className="text-gray-400 ms-3">{slug}</span>
        </h1>

        <GameList>
          {games?.map((game) => {
            return <GameList.Card key={game.id} game={game} />;
          })}
        </GameList>
      </div>
    </>
  );
}
