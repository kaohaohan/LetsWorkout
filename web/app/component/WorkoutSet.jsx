"use client";
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
//data 後端資料
const data = [
  {
    name: "RDL",
    set: 6,
    weight: 10,
    unit_type: "reps",
    // rest_time: 30,
  },
  {
    name: "RDL",
    set: 6,
    weight: 10,
    unit_type: "reps",
    // rest_time: 30,
  },
  {
    name: "RDL",
    set: 6,
    weight: 10,
    unit_type: "reps",
  },
];

// const WorkoutSet = () => {
//   const [editedExercise, setEditedExercise] = useState(
//     data.map((exercise) => {
//       return { weight: exercise.weight, set: exercise.set };
//     })
//   );

//   return (
//     <div>
//       <h1>{data[0].name}</h1>
//       <div>
//         <div>Set</div>
//         <div>Weight</div>
//         <div>{data[0].unit_type}</div>
//       </div>
//       {data.map((exercise, index) => {
//         return (
//           <>
//             <div key={index}></div>
//             <div>{index + 1}</div>
//             <input
//               placeholder={exercise.weight.toString()}
//               value={editedExercise[index].weight}
//             ></input>

//             <input
//               placeholder={exercise.set.toString()}
//               value={editedExercise[index].weight}
//             ></input>
//             {index !== data.length - 1 && <div>Rest Timer[30secs]</div>}
//           </>
//         );
//       })}
//     </div>
//   );
// };

const WorkoutSet = () => {
  //   const [data, setData] = useState([]); //改變狀態, 用來儲存
  const [data, setData] = useState([]); //改變狀態，用來儲存user編輯過的運動數據

  useEffect(() => {
    //使用 useEffect 在取得後端存的課表
    axios.get("http://localhost:4030/api/exercises").then((response) => {
      // response 是HTTP的回應
      console.log("response", response);
      setData(response.data);
    });
    //記得放空陣列看文件
  }, []);
  if (!data[0]) {
    //理論是loading畫面
    return <div>Loading !!</div>;
  }
  return (
    //整個UI架構
    <div className=" border border-black">
      <h1 className="h-24	bg-amber-300 flex justify-center items-center text-xl">
        {data[0].name}
      </h1>

      <div className="py-6 px-3 bg-black 	">
        <div className="bg-gray-900	rounded-lg px-8 py-6 text-white">
          <div className=" grid mb-4  gap-4 grid-cols-3 text-lg uppercase ">
            <div className="text-center	 ">Set</div>
            <div className="text-center	">Weight</div>
            <div className="text-center	">{data[0].unit_type}</div>
          </div>

          {data.map((exercise, index) => {
            return (
              <>
                <div
                  className=" grid text-2xl gap-4 mb-4 grid-cols-3  "
                  key={index}
                >
                  <div className="flex 	items-center justify-center">
                    {index + 1}
                  </div>
                  <input
                    placeholder={exercise.weight.toString()}
                    value={data[index].weight}
                    className="text-center text-white  bg-gray-300/50 py-6 px-2  rounded"
                  ></input>

                  <input
                    placeholder={exercise.reps.toString()}
                    value={data[index].reps}
                    className="text-center  text-white bg-gray-300/50 py-6 px-2 rounded"
                  ></input>
                </div>
                {index !== data.length - 1 && (
                  <div className="uppercase mb-4 text-center text-lg text-white rounded-xl bg-sky-400  px-2 py-3">
                    Rest Timer[30secs]
                  </div>
                )}
              </>
            );
          })}
          <div className="mb-4 text-center border-white border-[1px] text-white rounded-xl border-solid  bg-black  px-2 py-3">
            Confirm
          </div>
        </div>
      </div>
    </div>
  );
};
export default WorkoutSet;
