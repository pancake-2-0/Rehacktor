import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import routes from "../../router/routes";
import { supabase } from "../../database/supabase";
import { FaCamera, FaIdBadge, FaSave, FaUpload, FaUser, FaUserCog } from "react-icons/fa";

export default function ProfileSettingPage() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const { profile, getUser } = useContext(UserContext);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}${Math.random()}.${fileExt}`;
    await supabase.storage.from("avatars").upload(fileName, file);
    await supabase
      .from("profiles")
      .upsert({ id: profile.id, avatar_url: fileName })
      .select();
    await getUser();
    navigate(routes.profile);
  };

  const { updateProfile } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFile(() => e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(() => imageUrl);
    }
  }, [file]);

  const onSubmit = (data) => {
    updateProfile(data);
    navigate(routes.profile);
  };

  return (
    <main className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center gap-4 px-4 py-10 font-roboto">
      <form
        className="w-full max-w-2xl rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8">
          <h1 className="font-electro text-3xl text-white">Profile settings</h1>
          <p className="mt-2 text-sm text-gray-400">
            Update your public player data.
          </p>
        </div>

        <div className="grid gap-x-4 sm:grid-cols-2">
          <div>
            <label className="input input-lg mb-5 w-full bg-[#2d3139] text-white border-[#3f444e] focus-within:border-white">
              <FaUser className="text-gray-400" />
              <input
                type="text"
                placeholder="Name"
                {...register("first_name", { required: "This field is required" })}
              />
            </label>

            {errors.first_name && (
              <p role="alert" className="text-error mb-5 text-sm">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="input input-lg mb-5 w-full bg-[#2d3139] text-white border-[#3f444e] focus-within:border-white">
              <FaIdBadge className="text-gray-400" />
              <input
                type="text"
                placeholder="Last Name"
                {...register("last_name", { required: "This field is required" })}
              />
            </label>

            {errors.last_name && (
              <p role="alert" className="text-error mb-5 text-sm">
                {errors.last_name.message}
              </p>
            )}
          </div>
        </div>

        <label className="input input-lg mb-5 w-full bg-[#2d3139] text-white border-[#3f444e] focus-within:border-white">
          <FaUserCog className="text-gray-400" />
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: "This field is required" })}
          />
        </label>

        {errors.username && (
          <p role="alert" className="text-error mb-5 text-sm">
            {errors.username.message}
          </p>
        )}

        <button className="btn btn-neutral w-full sm:w-auto">
          <FaSave />
          Edit
        </button>
      </form>

      <form
        className="w-full max-w-2xl rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8"
        onSubmit={handleAvatarSubmit}
      >
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-[#2d3139] bg-[#111317] text-2xl text-gray-400">
            {preview ? (
              <img src={preview} alt="" className="h-full w-full object-cover" />
            ) : (
              <FaCamera />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-electro text-2xl text-white">Avatar</h2>
            <p className="mb-4 text-sm text-gray-400">
              Choose a new profile image.
            </p>
            <input
              type="file"
              className="file-input file-input-lg w-full bg-[#2d3139] text-white border-[#3f444e]"
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="btn btn-neutral w-full sm:w-auto">
          <FaUpload />
          Change Avatar
        </button>
      </form>
    </main>
  );
}
