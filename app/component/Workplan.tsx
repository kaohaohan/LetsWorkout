"use client";
import Link from "next/link";
import { Steps, Button, StepProps } from "antd";
import React, { useState } from "react";
import ModalDialogs from "./ModalDialogs";

//sudo code
//1 資料 要從外面來
// 2. 把資料放進workplan 的aurgument
//3. 每一個workplan 自己應該都要有對應的資料
//4. 使用到workplan的地方要傳遞對應的資料進來

interface WorkplanProps {
  isForCoach?: boolean;
  date: string;
  plan: Plan;
}
type Plan = Array<{
  title: string;
  status: StepProps["status"];
}>;

const Workplan: React.FC<WorkplanProps> = ({
  isForCoach = false,
  date,
  plan,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // if (isForCoach) {
  //   itemsData.push({
  //     title: (
  //       <Button type="primary" onClick={handleOpenModal}>
  //         +
  //       </Button>
  //     ) as unknown as string, // 强制类型转换为 string
  //     description: <div>&nbsp;</div>,
  //     status: "wait" as "wait",
  //   });
  // }

  return (
    <div className="bg-white p-8">
      <h1 className="text-black text-lg">Today's Workout</h1>
      <Steps
        direction="vertical"
        items={plan.map((workout, index) => {
          return {
            title: (
              <Link href={`/workplans/${date}/${index + 1}`}>
                {workout.title}
              </Link>
            ),

            description: <div>&nbsp;</div>,
            status: workout.status,
          };
        })}
      />
      <ModalDialogs open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Workplan;
