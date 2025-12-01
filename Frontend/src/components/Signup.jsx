import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider"; // make sure you have this
import Login from "./Login";

function Signup() {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useAuth(); // Auth context
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    };

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/signup`,
        userInfo
      );

      console.log("Signup response:", res.data); // debug

      if (res.data?.user) {
        // 1. Update auth context
        setAuthUser(res.data.user);

        // 2. Store in localStorage
        localStorage.setItem("authUser", JSON.stringify(res.data.user));

        // 3. Success toast
        toast.success("Signup Successful");

        // 4. Redirect to courses
        navigate("/course", { replace: true });
      }
    } catch (err) {
      console.error("Signup error:", err);

      const message =
        err?.response?.data?.message || err.message || "Signup failed";
      toast.error("Error: " + message);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-[600px]">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Link
              to="/"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </Link>

            <h3 className="font-bold text-lg">Signup</h3>

            {/* Name */}
            <div className="mt-4">
              <span>Name</span>
              <input
                type="text"
                placeholder="Enter your fullname"
                className="w-80 px-3 py-1 border rounded-md outline-none mt-1"
                {...register("fullname", { required: "Fullname is required" })}
              />
              {errors.fullname && (
                <span className="text-sm text-red-500">
                  {errors.fullname.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div className="mt-4">
              <span>Email</span>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-80 px-3 py-1 border rounded-md outline-none mt-1"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="mt-4">
              <span>Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-80 px-3 py-1 border rounded-md outline-none mt-1"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col items-start mt-6 gap-3">
              <button
                type="submit"
                className="bg-pink-500 text-white rounded-md px-4 py-2 hover:bg-pink-700 transition"
              >
                Signup
              </button>

              <p className="text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline text-blue-500"
                  onClick={() => document.getElementById("my_modal_3")?.showModal()}
                >
                  Login
                </button>
                <Login />
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
