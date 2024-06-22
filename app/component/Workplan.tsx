"use client";
import React from "react";
import { Divider, Steps } from "antd";

function Workplan() {
  return (
    <div className="bg-white p-8">
      <h1 className="text-black text-lg">Today&apos;s Workout</h1>
      <Steps
        direction="vertical"
        items={[
          {
            title: <div> Finished</div>,
            description: <div> &nbsp;</div>,
            status: "finish",
          },

          {
            title: "Finished",
            description: <div> &nbsp;</div>,
          },
          {
            title: "In Progress",
            description: <div>&nbsp;</div>,
            status: "error",
          },
          {
            title: "Waiting",
            description: <div>&nbsp;</div>,
            status: "finish",
          },
          {
            title: "Waiting",
            description: <div>&nbsp;</div>,
          },
        ]}
      />
    </div>
  );
}
export default Workplan;
