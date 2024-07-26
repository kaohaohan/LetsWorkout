"use client";
// src/app/calendar/calendar.tsx
import React, { useState, useEffect } from "react";
import { Calendar as AntdCalendar, CalendarProps, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

//firebase
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// 假數據
const workoutData: { [key: string]: string[] } = {
  "2024-05-01": ["Workout A", "Workout B"],
  "2024-05-02": ["Workout C"],
  "2024-05-03": ["Workout D", "Workout E", "Workout F"],
};
const colors = [
  "pink",
  "red",
  "yellow",
  "orange",
  "cyan",
  "green",
  "blue",
  "purple",
  "geekblue",
  "magenta",
  "volcano",
  "gold",
  "lime",
];

//做點點
const cellRender: CalendarProps<Dayjs>["cellRender"] = (current, info) => {
  if (info.type === "date") {
    const workout = Object.entries(workoutData).find((day) => {
      return current.isSame(day[0], "day");
    });
    if (workout) {
      return <Badge color="#f50" />;
    }
  }
};

const Calendar: React.FC = () => {
  const onSelect = (value: Dayjs) => {
    const dateString = value.format("YYYY-MM-DD");
    console.log(`Workouts for ${dateString}:`, workoutData[dateString] || []);
  };

  return (
    <div className="my-2">
      <AntdCalendar
        onSelect={onSelect}
        defaultValue={dayjs("2024-05-01")}
        cellRender={cellRender}
      />
    </div>
  );
};

export default Calendar;
