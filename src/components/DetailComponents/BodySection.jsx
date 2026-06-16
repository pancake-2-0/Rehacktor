import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { supabase } from "../../database/supabase";
import { useEffect, useState } from "react";

export default function BodySection({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);

  const handle_description = (e) => {
    setDescription(e.target.value);
  };

  const get_reviews = async () => {
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("game_id", game.id);

    setGameReviews(reviews ?? []);
  };

  const add_review = async () => {
    if (!description.trim()) return;

    await supabase
      .from("reviews")
      .insert([
        {
          profile_id,
          game_id: game.id,
          game_name: game.name,
          description,
        },
      ])
      .select();

    setDescription("");
    setCheckReview(!checkReview);
  };

  const get_favourite = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select("*")
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    if (favourites?.length > 0) setIsFavourite(true);
  };

  useEffect(() => {
    get_favourite();
    get_reviews();
  }, [checkReview]);

  const add_game = async () => {
    await supabase
      .from("favourites")
      .insert([{ profile_id, game_id: game.id, game_name: game.name }])
      .select();
    setIsFavourite(true);
  };

  const remove_game = async () => {
    await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);
    setIsFavourite(false);
  };

  return (
    <section className="grid grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-6 lg:px-10">
      <div className="lg:col-span-5 flex flex-col items-center rounded-4xl border border-[#2d3139] bg-[#131518]/80 p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.8)]">
        <p className="text-white text-2xl font-semibold mb-5">Reviews</p>
        <textarea
          className="textarea w-full max-w-3xl rounded-3xl border border-[#2d3139] bg-[#0e1014] px-5 py-4 text-white placeholder:text-gray-500 focus:border-white/30 focus:outline-none"
          placeholder="Type your review"
          onChange={handle_description}
          value={description}
        ></textarea>
        <button
          className="btn mt-4 w-40 rounded-full bg-[#24272d] text-white shadow-lg shadow-[#00000033] transition hover:bg-white/10"
          onClick={add_review}
        >
          Send
        </button>

        <div className="mt-6 w-full max-w-3xl overflow-auto rounded-[28px] border border-[#2d3139] bg-[#090b0f] p-4 text-white">
          {gameReviews && gameReviews.length > 0 ? (
            gameReviews.map((review) => (
              <p
                key={review.id}
                className="mb-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
              >
                {review.description}
              </p>
            ))
          ) : (
            <p className="text-gray-400">No reviews yet.</p>
          )}
        </div>
      </div>

      <div className="flex justify-center items-start lg:items-center">
        {(isFavourite && (
          <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-linear-to-br from-red-500/15 to-transparent text-red-500 shadow-[0_24px_60px_-30px_rgba(255,0,0,0.9)] transition duration-300 hover:-translate-y-1 hover:bg-red-500/20 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            onClick={remove_game}
            aria-label="Remove from favourites"
          >
            <FaHeart className="text-6xl" />
          </button>
        )) || (
          <button
            type="button"
            className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-[#121317] text-red-500 shadow-[0_24px_60px_-30px_rgba(255,0,0,0.7)] transition duration-300 hover:-translate-y-1 hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-500/50"
            onClick={add_game}
            aria-label="Add to favourites"
          >
            <FaRegHeart className="text-6xl" />
          </button>
        )}
      </div>
    </section>
  );
}
