"use client";
import "./page.css";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

function SignUp() {
  return (
    <body className="bg-white">
      <div className="flex min-h-screen">
        <div className="flex flex-row w-full">
          <div className="hidden lg:flex flex-col justify-between bg-gray-800 lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg">
            <div className="flex items-center justify-start space-x-3">
              <a href="/">
                <img
                  className="h-8 w-auto"
                  src="logo2.png"
                  alt="Your Company"
                />
              </a>
            </div>
            <div className="space-y-5">
              <h1 className="font-extrabold lg:text-3xl xl:text-5xl xl:leading-snug text-orange-700">
                Yeah Buddy! Train Harder Than Last Time!!
              </h1>
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
                <a href="#" className="underline font-medium text-[#070eff]">
                  Sign up now
                </a>
              </div>
            </div>

            <div className="flex flex-col justify-center flex-1 max-w-md space-y-5">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl font-bold md:text-4xl">Hey Welcome</h2>
                <p className="text-md md:text-xl">
                  Sing up and enjoy the whole new exeprices for your workout!!
                </p>
              </div>
              <div className="flex flex-col md:max-w-md  space-y-5">
                <input
                  type="text"
                  placeholder="Username"
                  className="flex px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500"
                />
                <input
                  type="text"
                  placeholder="Email"
                  className="flex px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3 placeholder:font-normal focus:outline-none focus:border-blue-500"
                />

                <button className="relative flex justify-between font-medium rounded-lg placeholder:font-normal focus:border-2 focus:border-blue-500">
                  <input
                    placeholder="Password"
                    className="flex w-full px-3 py-2 border-2 border-black rounded-lg md:px-4 md:py-3 focus:outline-none focus:border-2 focus:border-blue-500"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center w-1/12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 28"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10 mt-2"
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

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 28 28"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-10 h-10 mt-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  </div>
                </button>
                <button className="flex items-center justify-center flex-none px-3 py-2 font-medium text-white bg-black border-2 border-black rounded-lg md:px-4 md:py-3">
                  <a href="/calendar">Sign up</a>
                </button>
                <div className="flex items-center justify-center">
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Or</span>
                  <span className="w-full border border-black"></span>
                </div>
                <button className="relative flex items-center justify-center flex-none px-3 py-2 font-medium border-2 border-black rounded-lg md:px-4 md:py-3">
                  <span className="absolute left-4">
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    ></svg>
                  </span>
                  <a href="/login">
                    <span> Already a member ?</span>
                  </a>
                </button>
              </div>
            </div>

            <div className="flex flex-col justify-center m-auto mb-16 text-lg text-center dark:text-slate-200 ">
              <p className="mb-1 font-bold">
                Built by{" "}
                <a href="#" className="underline dark:text-white">
                  Hao Han Kao
                </a>
              </p>
              <p>Contact me on the different platforms and social networks</p>
              <div className="flex flex-wrap items-center justify-center mt-4 space-x-2">
                <a
                  href="https://www.linkedin.com/in/hao-han-kao-2a05b9153/"
                  className="flex items-center justify-center flex-none w-12 h-12 transition-all rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="4.983"
                      cy="5.009"
                      r="2.188"
                      fill="currentColor"
                    ></circle>
                    <path
                      d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>

                <a
                  href="https://github.com/kaohaohan"
                  className="flex items-center justify-center flex-none w-12 h-12 transition-all rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}

export default SignUp;
