// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import CalendarComponent from "../component/Calendar";
import { addDays, format, isToday } from "date-fns";
import Workplan from "../component/Workplan";
import CarouselCard from "../component/CarouselCard";
import { toZonedTime } from "date-fns-tz"; // Ensure proper import
interface WorkplanPageProps {
  defaultDate: string;
}
//time zone for Toronto
const timeZone = "America/Toronto";
//Destructuring

const WorkplanPage: React.FC<WorkplanPageProps> = ({ defaultDate }) => {
  const initialDate = toZonedTime(new Date("2024-06-22"), timeZone);
  //useState will return array
  const [date, setDate] = useState(initialDate);
  const beforeChange = (current: number, next: number) => {
    const days = next - current;
    setDate((date: any) => addDays(date, days));
  };
  return (
    <div className="flex justify-center">
      <div id="hello" className="w-1/2 text-center mt-8">
        <h1 className="text-2xl">{isToday(date) ? "Today" : " "}</h1>
        <h1 className="text-xl mb-2">{format(date, "MM/dd")}</h1>
        <CarouselCard beforeChange={beforeChange} />
        {/* <Workplan /> */}
      </div>
    </div>
  );
};

export default WorkplanPage;
