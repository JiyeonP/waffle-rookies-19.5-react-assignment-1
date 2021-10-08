import "./DashBoard.css";
import { PieChart, Pie, LabelList } from "recharts";
import {useEffect} from "react";
import API from "../../API";

const DashBoard = () => {
  let studentList = [];

  useEffect(() => {
    API.get("/student").then((res) => {
      studentList = res.data;
    });
  }, []);

  const gradeData = [
    {
      grade: "1학년",
      count: studentList.filter((item) => item.grade === 1).length,
    },
    {
      grade: "2학년",
      count: studentList.filter((item) => item.grade === 2).length,
    },
    {
      grade: "3학년",
      count: studentList.filter((item) => item.grade === 3).length,
    },
  ];

  return (
    <div className="dashBoard">
      <div className="dashBoardSlot">안녕하세요,<br/>와플 고등학교 홈페이지 입니다.</div>
      <PieChart width={200} height={140}>
        <Pie
          stroke="#ef7c6a"
          strokeWidth="1"
          data={gradeData}
          cx="50%"
          cy="50%"
          dataKey="count"
          nameKey="grade"
          outerRadius={50}
          fill="#ffccba"
        >
          <LabelList
            strokeWidth="0.5"
            dataKey="grade"
            position="outside"
            style={{ fontSize: "70%", fill: "#ef7c6a", fontWeight: "bold" }}
          />
          <LabelList
            stroke="none"
            dataKey="count"
            position="inside"
            style={{ fontSize: "120%", fill: "#ef7c6a", fontWeight: "bold" }}
          />
        </Pie>
      </PieChart>
    </div>
  );
};

export default DashBoard;
