// src/app/page.tsx
"use client"
import React, { useState,useEffect } from "react";
import CalendarComponent from "../component/Calendar";
import "./page.css";
import Workplan from "../component/Workplan";

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  
  return (
    <div className="flex justify-center">
      <div id="hello" className="w-1/2">
        <Workplan />
        <CalendarComponent />
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default App;
