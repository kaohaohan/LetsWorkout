// src/app/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import TeamCard from "@/app/component/TeamCard";

interface Team {
  name: string;
  memberCount: number;
  imageUrl: string;
}
const Teams: React.FC = () => {
  //我會打API拿到一包mamber teams array
  //在渲染的邏輯裡面是用react state or effect
  //所以拿到一包要用teams的資料，要有一個useState

  //useState:每一個頁面中我要渲染的資料的值，使用它去改
  //我畫面上某個東西要改變的話，假設我按一個按鈕按一下會+1 那就是用useState
  //[teams, setTeams(<-是一個callback fuction )]
  //useState([])初始值是？？ 是teams =[]吧 所以給裡面是[]
  const [teams, setTeams] = useState<Team[]>([]);
  //裡面給arrow 處理api
  useEffect(() => {
    //打一個api拿teams 的資料
    //用setTeams()去改變狀態
    let fakeTeams = [
      {
        name: "Seneca Women Basketball",
        memberCount: 20,
        imageUrl:
          "https://d2o2figo6ddd0g.cloudfront.net/x/w/7blxwq1l2hoznx/Bee_-_Grey_-on_dark-.png",
      },
      {
        name: "Toronto University Men Ice Hockey",
        memberCount: 20,
        imageUrl:
          "https://dxbhsrqyrr690.cloudfront.net/sidearm.nextgen.sites/varsityblues.ca/images/responsive_2024/logo_main.svg",
      },
      {
        name: "AMD QA team",
        memberCount: 50,
        imageUrl:
          "https://seeklogo.com/images/A/amd-advanced-micro-devices-logo-79A8F7C188-seeklogo.com.png",
      },
      {
        name: "Apple AI team",
        memberCount: 60,
        imageUrl:
          "https://substackcdn.com/image/fetch/f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F8ed3d547-94ff-48e1-9f20-8c14a7030a02_2000x2000.jpeg",
      },
    ];
    setTeams(fakeTeams);
  }, []);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {teams.map((team, index) => (
        <TeamCard
          key={index}
          name={team.name}
          memberCount={team.memberCount}
          imageUrl={team.imageUrl}
        />
      ))}
    </div>
  );
};

export default Teams;
