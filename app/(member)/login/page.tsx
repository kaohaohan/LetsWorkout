"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
function Login() {
  //   const [username, setUsername] = useState("");
  //   const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPwd(!showPwd);
  };

  return (
    <body className="bg-white">
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
          <div className="hidden lg:flex flex-col justify-between bg-gray-800 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <a href="/">
                <Image
                  className="h-8 w-auto"
                  src="logo2.png"
                  alt="Your Company"
                  width={32}
                  height={32}
                />
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="font-extrabold lg:text-3xl xl:text-5xl xl:leading-snug text-orange-700">
                Enter your account and discover new experiences
              </h1>
              <p className="text-lg text-orange-700">
                You do not have an account?
              </p>
              <a href="/signup" className="flex-none inline-block">
                <button className="px-4 py-3 font-medium text-white bg-orange-700 border-2 border-orange-700 rounded-lg">
                  Create account here
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
                <span>Not a member? </span>
                <a
                  href="/signup"
                  className="underline font-medium text-[#070eff]"
                >
                  Sign up now
                </a>
              </div>
            </div>
            <div className="flex flex-col justify-center flex-1 max-w-md space-y-5">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">
                  login to account
                </h2>
                <p className="text-md md:text-xl">
                  Sign up or log in to place the order, no password require!
                </p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="flex px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500 text-black"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="flex px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500 text-black"
                />
                <div className="relative flex">
                  <input
                    type={showPwd ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex-grow px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500 text-black"
                  />
                  <button
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-4 rounded-r-lg text-white bg-blue-500"
                  >
                    {showPwd ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 28 28"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 28 28"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center m-auto mb-16 text-lg text-center dark:text-slate-200">
              <p className="mb-1 font-bold">
                Built by{" "}
                <a href="#" className="underline dark:text-white">
                  Hao Han Kao
                </a>
              </p>
              <p>Contact me on the different platforms and social networks</p>
              {/* 省略了社交媒体链接代码 */}
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default Login;
