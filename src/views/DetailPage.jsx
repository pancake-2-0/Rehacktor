import { useLoaderData, useNavigate } from "react-router";
import Header from "../components/DetailComponents/Header";
import { FaCircleArrowLeft } from "react-icons/fa6";
import BodySection from "../components/DetailComponents/BodySection";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  return (
    <>
      <main
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)) ,url(${game.background_image})`,
        }}
        className="relative min-h-screen bg-center bg-cover bg-fixed"
      >
        <div className="pointer-events-none absolute inset-0 bg-black/30" />

        <div className="relative z-10">
          <FaCircleArrowLeft
            className="text-3xl fixed bottom-6 text-white left-6 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <Header game={game} />
          {profile && <BodySection game={game} profile_id={profile.id} />}
        </div>
      </main>
    </>
  );
}
