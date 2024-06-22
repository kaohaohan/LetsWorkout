// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import CalendarComponent from "../component/Calendar";
import "./page.css";
import Workplan from "../component/Workplan";
import CarouselCard from "../component/CarouselCard";

const App: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex justify-center">
      <div id="hello" className="w-1/2">
        <CarouselCard />
        {/* <Workplan /> */}
        <CalendarComponent />
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default App;
