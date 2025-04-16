"use client";
import React from "react";

interface Exercise {
  id: number;
  name: string;
  bodyPart: string;
  reps: number;
}

interface ExerciseItemProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void;
}

export default function ExerciseItem({
  exercise,
  onSelect,
}: ExerciseItemProps) {
  return (
    <div
      className="flex items-center border-b p-4 cursor-pointer hover:bg-gray-50"
      onClick={() => onSelect && onSelect(exercise)}
    >
      <div className="mr-4">
        <div className="w-16 h-16 bg-gray-200 rounded"></div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{exercise.name}</h3>
        <p className="text-gray-500">{exercise.bodyPart}</p>
      </div>
      <div className="text-2xl">{exercise.reps}</div>
      <button
        className="ml-2 text-blue-500 text-2xl bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
        onClick={(e) => {
          e.stopPropagation(); // 防止觸發父元素的點擊事件
          // 這裡可以添加顯示運動詳情的邏輯
        }}
      >
        ?
      </button>
    </div>
  );
}
