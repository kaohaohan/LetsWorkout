// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import CalendarComponent from "../../component/Calendar";
import "./page.css";
import Workplan from "../../component/Workplan";
import CarouselCard from "../../component/CarouselCard";
import { StepProps } from "antd";

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

const App: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div id="hello" className="w-1/2">
        <CarouselCard data={data} />
        <CalendarComponent />
      </div>
    </div>
  );
};

export default App;
