import "./DashBoard.css";
import { useStudentContext } from "../../Context/StudentContext";
import { PieChart, Pie, LabelList } from "recharts";

const DashBoard = () => {
  const { studentList } = useStudentContext();

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
      <PieChart width={720} height={140}>
        <Pie
          stroke="#ececec"
          strokeWidth="2"
          data={gradeData}
          cx="50%"
          cy="50%"
          dataKey="count"
          nameKey="grade"
          outerRadius={50}
          fill="#ff8c5a"
        >
          <LabelList
            stroke="#dd5555"
            strokeWidth="0.5"
            dataKey="grade"
            position="outside"
            style={{ fontSize: "90%", fill: "#ff8888", fontWeight: "bold" }}
          />
          <LabelList
            stroke="none"
            dataKey="count"
            position="inside"
            style={{ fontSize: "120%", fill: "#ffffff", fontWeight: "bold" }}
          />
        </Pie>
      </PieChart>
    </div>
  );
};

export default DashBoard;
