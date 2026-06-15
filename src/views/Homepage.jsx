import { useLoaderData } from "react-router";
import GameList from "../components/HomeComponents/GameList";
export default function Homepage() {
  const games = useLoaderData();
  console.log(games);

  return (
    <>
      <GameList>
        {games.map((game) => (
          <GameList.Card key={game.id} game={game} />
        ))}
      </GameList>
    </>
  );
}
