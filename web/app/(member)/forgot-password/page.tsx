"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../firebase";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (error: any) {
      console.error("Password reset error:", error);
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email");
      } else {
        setError("Failed to send reset email, please try again later");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
          <div className="hidden lg:flex flex-col justify-between bg-gray-800 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <a href="/">
                <Image
                  className="h-8 w-auto"
                  src="/logo2.png"
                  alt="Your Company"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="font-extrabold lg:text-3xl xl:text-5xl xl:leading-snug text-orange-700">
                Reset your password
              </h1>
              <p className="text-lg text-orange-700">Remember your password?</p>
              <a href="/login" className="flex-none inline-block">
                <button className="px-4 py-3 font-medium text-white bg-orange-700 border-2 border-orange-700 rounded-lg">
                  Back to login
                </button>
              </a>
            </div>
            <p className="font-medium text-orange-700">
              © 2023 Hao Han Kao Project
            </p>
          </div>

          <div className="relative flex flex-col items-center justify-center flex-1 px-10">
            <div className="flex items-center justify-between w-full py-4 lg:hidden">
              <div className="flex items-center justify-start space-x-3">
                <span className="w-6 h-6 bg-black rounded-full"></span>
                <a href="#" className="text-lg font-medium">
                  Brand
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span>Remember password? </span>
                <a
                  href="/login"
                  className="underline font-medium text-[#070eff]"
                >
                  Login now
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 max-w-md space-y-5">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  Forgot Password
                </h2>
                <p className="text-md md:text-xl">
                  Enter your email to reset your password
                </p>
              </div>
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <p className="block sm:inline">{error}</p>
                </div>
              )}
              {submitted ? (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <p className="font-bold">Password Reset Email Sent</p>
                  <p className="block sm:inline">
                    Check your email for instructions to reset your password.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col max-w-md space-y-5"
                >
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500 text-black"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center flex-none px-3 py-2 font-medium text-white bg-black border-2 border-black rounded-lg md:px-4 md:py-3"
                  >
                    {loading ? "Processing..." : "Reset Password"}
                  </button>
                  <div className="text-center">
                    <a href="/login" className="text-blue-600 hover:underline">
                      Back to login
                    </a>
                  </div>
                </form>
              )}
            </div>

            <div className="flex flex-col justify-center m-auto mb-16 text-lg text-center dark:text-slate-200">
              <p className="mb-1 font-bold">
                Built by{" "}
                <a href="#" className="underline dark:text-white">
                  Hao Han Kao
                </a>
              </p>
              <p>Contact me on the different platforms and social networks</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
