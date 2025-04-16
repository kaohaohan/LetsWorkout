"use client";
import React from "react";

export default function FilterBar() {
  return (
    <div className="flex space-x-2 mb-4">
      <button className="bg-gray-200 p-2 rounded-lg flex-1">
        Any Body Part
      </button>
      <button className="bg-gray-200 p-2 rounded-lg flex-1">
        Any Category
      </button>
    </div>
  );
}
