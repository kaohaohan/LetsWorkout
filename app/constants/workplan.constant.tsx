import { StepProps } from "antd";

export const WORKOUT_DATA: Array<{
  title: string;
  status: StepProps["status"];
  set: number;
  reps: number;
  unit_type: string;
}> = [
  {
    title: "Bench Press",
    status: "finish",
    set: 3,
    reps: 10,
    unit_type: "",
  },
  {
    title: "Pull Ups",
    status: "finish",
    set: 3,
    reps: 10,
    unit_type: "",
  },
  {
    title: "Shoulder Press",

    status: "error",
    set: 3,
    reps: 10,
    unit_type: "",
  },
  {
    title: "Barbell Row",
    status: "wait",
    set: 3,
    reps: 5,
    unit_type: "",
  },
  {
    title: "Dumbell Lateral Raise",
    status: "wait",
    set: 4,
    reps: 20,
    unit_type: "",
  },
];

export const DATA: Array<{
  date: string;
  plan: Array<{
    title: string;
    status: StepProps["status"];
  }>;
}> = [
  { date: "2021-09-01", plan: WORKOUT_DATA },

  { date: "2021-09-02", plan: WORKOUT_DATA },
  { date: "2021-09-03", plan: WORKOUT_DATA },
  { date: "2021-09-04", plan: WORKOUT_DATA },
  { date: "2021-09-05", plan: WORKOUT_DATA },
  { date: "2021-09-06", plan: WORKOUT_DATA },
  { date: "2021-09-07", plan: WORKOUT_DATA },
];
