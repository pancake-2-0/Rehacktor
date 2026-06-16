import { useLoaderData, useNavigate } from "react-router";
import Header from "../components/DetailComponents/Header";
import { FaCircleArrowLeft } from "react-icons/fa6";

export default function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  console.log(game);

  return (
    <>
      <main
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${game.background_image})`,
        }}
        className="min-h-screen bg-center bg-cover bg-fixed"
      >
        <FaCircleArrowLeft
          className="text-3xl fixed bottom-6 text-white left-6 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <Header game={game} />
      </main>
    </>
  );
}
