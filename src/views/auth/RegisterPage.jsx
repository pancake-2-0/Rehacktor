import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { FaEnvelope, FaIdBadge, FaLock, FaUser, FaUserPlus } from "react-icons/fa";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });

    navigate("/");
  };

  return (
    <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-10 font-roboto">
      <form
        className="w-full max-w-2xl rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8">
          <h1 className="font-electro text-3xl text-white">Create account</h1>
          <p className="mt-2 text-sm text-gray-400">
            Join Reaktor and shape your player profile.
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
          <FaUserPlus className="text-gray-400" />
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

        <label className="input input-lg mb-5 w-full bg-[#2d3139] text-white border-[#3f444e] focus-within:border-white">
          <FaEnvelope className="text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "This field is required" })}
          />
        </label>
        {errors.email && (
          <p role="alert" className="text-error mb-5 text-sm">
            {errors.email.message}
          </p>
        )}

        <label className="input input-lg mb-5 w-full bg-[#2d3139] text-white border-[#3f444e] focus-within:border-white">
          <FaLock className="text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
        </label>
        {errors.password && (
          <p role="alert" className="text-error mb-5 text-sm">
            {errors.password.message}
          </p>
        )}

        <button type="submit" className="btn btn-neutral w-full">
          <FaUserPlus />
          Sign up
        </button>
      </form>
    </main>
  );
}
