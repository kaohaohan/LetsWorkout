"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

export default function WorkoutInProgress() {
  const router = useRouter();
  const [workoutTime, setWorkoutTime] = useState("0:02");
  const [workoutName, setWorkoutName] = useState("Afternoon Workout");

  return (
    <div>
      <NavBar />
      <main className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <button className="bg-gray-200 rounded-lg p-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-refresh-cw"
            >
              <path d="M23 4v6h-6M1 20v-6h6"></path>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
            </svg>
          </button>
          <button className="bg-green-500 text-white px-6 py-4 rounded-lg font-bold">
            Finish
          </button>
        </div>

        <div className="flex items-center mb-8">
          <h1 className="text-4xl font-bold flex-1">{workoutName}</h1>
          <button className="rounded-full bg-gray-200 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-more-horizontal"
            >
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-4xl">{workoutTime}</h2>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl text-gray-400">Notes</h2>
          <textarea
            className="w-full mt-2 border border-gray-200 rounded-lg p-4"
            rows={3}
            placeholder="Add workout notes here..."
          ></textarea>
        </div>

        <button
          onClick={() => router.push("/add-exercise")}
          className="w-full bg-blue-100 text-blue-500 font-bold py-4 rounded-lg mb-4"
        >
          Add Exercises
        </button>

        <button className="w-full bg-red-100 text-red-500 font-bold py-4 rounded-lg">
          Cancel Workout
        </button>
      </main>
    </div>
  );
}
