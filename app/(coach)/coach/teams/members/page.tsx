// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import MemberCard from "@/app/component/MemberCard";

interface Member {
  name: string;
  title: string;
  imageUrl: string;
  status: string;
}
const Members: React.FC = () => {
  let [members, setMembers] = useState<Member[]>([]);
  //裡面給arrow 處理api
  useEffect(() => {
    //打一個api拿teams 的資料
    //用setTeams()去改變狀態
    let fakeMambers = [
      {
        name: "Hao Han Kao",
        title: "Point Guard",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "Inactive",
      },
      {
        name: "Tiger Yi",
        title: "Center",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "Active",
      },
      {
        name: "Vicky Chen",
        title: "Power Forward",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "Active",
      },
      {
        name: "Cheryl Chao",
        title: "Small Forward",
        imageUrl:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        status: "Inactive",
      },
    ];
    setMembers(fakeMambers);
  }, []);
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {members.map((member, index) => (
        <MemberCard
          key={index}
          name={member.name}
          title={member.title}
          imageUrl={member.imageUrl}
          status={member.status}
        />
      ))}
    </ul>
  );
};

export default Members;
