// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";

import CarouselCard from "../../component/CarouselCard";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import WorkoutSet from "@/app/component/WorkoutSet";
import { StepProps } from "antd";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Toronto");

//time zone for Toronto
const timeZone = "America/Toronto";
//Destructuring

const itemsData: Array<{
  title: string;
  status: StepProps["status"];
}> = [
  {
    title: "Bench press",
    status: "finish",
  },
  {
    title: "Pull ups",

    status: "finish",
  },
  {
    title: "In Progress",

    status: "error",
  },
  {
    title: "Waiting",

    status: "wait",
  },
  {
    title: "Waiting",

    status: "wait",
  },
];

const data: Array<{
  date: string;
  plan: Array<{
    title: string;
    status: StepProps["status"];
  }>;
}> = [
  { date: "2021-09-01", plan: itemsData },

  { date: "2021-09-02", plan: itemsData },
  { date: "2021-09-03", plan: itemsData },
  { date: "2021-09-04", plan: itemsData },
  { date: "2021-09-05", plan: itemsData },
  { date: "2021-09-06", plan: itemsData },
  { date: "2021-09-07", plan: itemsData },
];

interface WorkplanPageProps {
  defaultDate: string;
}

export default function WorkplanPage({ defaultDate }: WorkplanPageProps) {
  //   const initialDate = toZonedTime(new Date("2024-06-22"), timeZone);

  //useState will return array
  //   const [date, setDate] = useState(dayjs(defaultDate));
  const [date, setDate] = useState(dayjs());
  const beforeChange = (current: number, next: number) => {
    const days = next - current;
    setDate((date: any) => date.add(days, "days"));
  };

  const isToday = date.isSame(dayjs(), "days");
  return (
    <div className="flex justify-center">
      <div id="hello" className="w-1/2 text-center mt-8">
        <h1 className="text-2xl">{isToday ? "Today" : " "}</h1>
        <h1 className="text-xl mb-2">{date.format("MM/DD")}</h1>
        <CarouselCard data={data} beforeChange={beforeChange} />
      </div>
    </div>
  );
}
