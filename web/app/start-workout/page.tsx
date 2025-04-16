"use client";
import React from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/NavBar";

export default function StartWorkout() {
  const router = useRouter();

  return (
    <div>
      <NavBar />
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8">Start Workout</h1>

        <div className="mb-8">
          <h2 className="text-2xl mb-4">Quick Start</h2>
          <button
            onClick={() => router.push("/add-exercise")}
            className="bg-blue-500 text-white p-4 rounded-lg w-full"
          >
            Start an Empty Workout
          </button>
        </div>

        <div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Templates</h2>
            <button className="text-blue-500">+ Template</button>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* 模板卡片 */}
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">Legs</h3>
              <p className="text-gray-600">
                Squat (Barbell), Leg Extension (Machine)
              </p>
            </div>
            <div className="border p-4 rounded-lg">
              <h3 className="font-bold">Chest and Triceps</h3>
              <p className="text-gray-600">
                Bench Press (Barbell), Incline Bench Press
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
