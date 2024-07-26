"use client";
import WorkoutSet from "@/app/component/WorkoutSet";

interface WorkplanDateProps {
  params: any;
}
//在params 定義大括號: WorkplanDateProps的型別
//dynamic route
//可以從URL上取到我們要的資訊
function WorkoutDate({ params }: WorkplanDateProps) {
  console.log(params);
  return (
    <div>
      <WorkoutSet />
    </div>
  );
}
export default WorkoutDate;
