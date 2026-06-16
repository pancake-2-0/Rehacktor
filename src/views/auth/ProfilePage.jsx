import avatar from "../../assets/avatar.png";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { UserContext } from "../../context/UserContext";
import routes from "../../router/routes";
import { supabase } from "../../database/supabase";
import { FaEnvelope, FaGamepad, FaUser, FaUserCog } from "react-icons/fa";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState();
  const [userFavourites, setUserFavourites] = useState();

  const download_avatar = async () => {
    if (profile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  const get_Favourites = async () => {
    if (profile) {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);
      setUserFavourites(favourites);
    }
  };

  useEffect(() => {
    download_avatar();
    get_Favourites();
  }, [profile]);

  return (
    <main className="min-h-[calc(100vh-160px)] px-4 py-10 font-roboto">
      {user && profile && (
        <section className="mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <article className="rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 text-center shadow-2xl">
            <div className="mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-[#2d3139] bg-[#2d3139]">
              <img
                src={avatarUrl ?? avatar}
                className="h-full w-full object-cover"
                alt="Profile Image"
              />
            </div>
            <h2 className="mt-5 font-electro text-3xl text-white">
              {profile.first_name}
            </h2>
            <p className="mt-1 text-sm text-gray-400">@{profile.username}</p>

            <Link
              className="btn btn-neutral mt-6 w-full"
              to={routes.profile_settings}
            >
              <FaUserCog />
              Settings
            </Link>
          </article>

          <article className="rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-box bg-[#2d3139] text-white">
                <FaGamepad />
              </div>
              <div>
                <h3 className="font-electro text-2xl text-white">Your data</h3>
                <p className="text-sm text-gray-400">Profile information</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-box border border-[#2d3139] bg-[#111317] p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <FaUser />
                  <span className="text-sm">Name</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {profile.first_name} {profile.last_name}
                </p>
              </div>

              <div className="rounded-box border border-[#2d3139] bg-[#111317] p-4">
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <FaUserCog />
                  <span className="text-sm">Username</span>
                </div>
                <p className="text-lg font-semibold text-white">
                  {profile.username}
                </p>
              </div>

              <div className="rounded-box border border-[#2d3139] bg-[#111317] p-4 sm:col-span-2">
                <div className="mb-2 flex items-center gap-2 text-gray-400">
                  <FaEnvelope />
                  <span className="text-sm">Email</span>
                </div>
                <p className="break-all text-lg font-semibold text-white">
                  {user.email}
                </p>
              </div>
            </div>
          </article>
        </section>
      )}

      {userFavourites && userFavourites.length > 0 && (
        <section className="mx-auto mt-12 w-full max-w-5xl">
          <article className="rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-box bg-[#2d3139] text-white">
                <FaGamepad />
              </div>
              <div>
                <h3 className="font-electro text-2xl text-white">
                  Your Favourites
                </h3>
                <p className="text-sm text-gray-400">Games you love</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {userFavourites.map((game) => (
                <div
                  key={game.id}
                  className="group rounded-box border border-[#2d3139] bg-[#111317] overflow-hidden shadow-lg hover:border-white/30 transition-all duration-300 p-4"
                >
                  <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                    {game.game_name}
                  </h4>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}
    </main>
  );
}
