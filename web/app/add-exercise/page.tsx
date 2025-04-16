"use client";
import React, { useState } from "react";
import NavBar from "../components/NavBar";
import FilterBar from "./components/FilterBar";
import ExerciseItem from "./components/ExerciseItem";
import { useRouter } from "next/navigation";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  reps: number;
}

export default function AddExercise() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  // 範例運動列表
  const exercises: Exercise[] = [
    { id: 1, name: "Hack Squat", bodyPart: "Legs", reps: 10 },
    { id: 2, name: "Lying Leg Curl (Machine)", bodyPart: "Legs", reps: 7 },
    { id: 3, name: "Squat (Barbell)", bodyPart: "Legs", reps: 6 },
    { id: 4, name: "Leg Press", bodyPart: "Legs", reps: 3 },
    {
      id: 5,
      name: "Calf Press on Seated Leg Press",
      bodyPart: "Legs",
      reps: 1,
    },
    { id: 6, name: "Squat (Machine)", bodyPart: "Legs", reps: 3 },
    { id: 7, name: "Lat Pulldown (Machine)", bodyPart: "Back", reps: 1 },
    { id: 8, name: "Triceps Dip", bodyPart: "Arms", reps: 3 },
  ];

  const handleSelectExercise = (exercise: Exercise) => {
    console.log("Selected exercise:", exercise);
    // 這裡可以添加選中運動後的邏輯
    router.push("/workout-in-progress");
  };

  return (
    <div>
      <NavBar />
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => router.push("/workout-in-progress")}
            className="text-2xl font-bold"
          >
            ✕
          </button>
          <h1 className="text-2xl font-bold text-blue-500">New</h1>
          <div>
            <button className="text-gray-400 mr-4">Superset</button>
            <button className="text-gray-400">Add</button>
          </div>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 rounded-lg"
          />
        </div>

        <FilterBar />

        <h2 className="text-xl text-gray-500 mb-4">RECENT</h2>

        <div className="border-t">
          {exercises.map((exercise) => (
            <ExerciseItem
              key={exercise.id}
              exercise={exercise}
              onSelect={handleSelectExercise}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
