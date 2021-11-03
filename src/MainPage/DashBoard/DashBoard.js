import "./DashBoard.css";
import { useEffect, useState } from "react";
import API from "../../API";
import { Pie, PieChart, Cell, Legend, LabelList } from "recharts";

const DashBoard = ({studentList}) => {

  const gradeData = [
    {
      grade: "1st",
      count: studentList.filter((item) => item.grade === 1).length,
    },
    {
      grade: "2nd",
      count: studentList.filter((item) => item.grade === 2).length,
    },
    {
      grade: "3rd",
      count: studentList.filter((item) => item.grade === 3).length,
    },
  ];

  const colors = ["#ef7c6a", "#333333", "#eeaa77"];

  let renderLabel = function (entry) {
    return entry.count;
  };

  return (
    <div className="dashBoard">
      <div className="dashBoardSlot">
        <br />
        안녕하세요,
        <br />
        와플 고등학교 홈페이지 입니다.
      </div>
      <PieChart width={200} height={140}>
        <Pie
          innerRadius={30}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={0}
          data={gradeData}
          cx="50%"
          cy="45%"
          dataKey="count"
          nameKey="grade"
        >
          {gradeData.map((entry, index) => (
            <Cell fill={colors[index % colors.length]} />
          ))}
          <LabelList
            stroke="none"
            dataKey="count"
            position="inside"
            style={{ fontSize: "80%", fill: "#ffffff", fontWeight: "bold" }}
          />
        </Pie>
        <Legend />
      </PieChart>
    </div>
  );
};

export default DashBoard;
