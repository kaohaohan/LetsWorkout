"use client";
import React from "react";
import { Divider, Steps } from "antd";

function Workplan() {
  return (
    <div className="bg-white p-8">
      <h1 className="text-black text-lg">Today&apos;s Workout</h1>
      <Steps
        direction="vertical"
        current={3}
        items={[
          {
            title: <div> Finished</div>,
            description: <div> &nbsp;</div>,
          },

          {
            title: "Finished",
            description: <div> &nbsp;</div>,
          },
          {
            title: "In Progress",
            description: <div>&nbsp;</div>,
          },
          {
            title: "Waiting",
            description: <div>&nbsp;</div>,
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
