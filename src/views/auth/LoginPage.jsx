import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const onSubmit = async (user_data) => {
    await login({
      email: user_data.email,
      password: user_data.password,
    });
    navigate("/");
  };
  return (
    <main className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-10 font-roboto">
      <form
        className="w-full max-w-md rounded-box border border-[#2d3139] bg-[#1a1c20] p-6 shadow-2xl sm:p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-8">
          <h1 className="font-electro text-3xl text-white">Sign in</h1>
          <p className="mt-2 text-sm text-gray-400">
            Welcome back to Reaktor.
          </p>
        </div>

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
              minLength: 8,
            })}
          />
        </label>

        {errors.password && (
          <p role="alert" className="text-error mb-5 text-sm">
            {errors.password.message}
          </p>
        )}

        <button className="btn btn-neutral w-full">
          <FaSignInAlt />
          Sign in
        </button>
      </form>
    </main>
  );
}
