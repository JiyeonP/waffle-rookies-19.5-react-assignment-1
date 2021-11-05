import "./DashBoard.css";
import {
  Pie,
  PieChart,
  Cell,
  LabelList,
  BarChart,
  Bar,
  XAxis,
  PolarAngleAxis,
  Legend,
} from "recharts";
import { useEffect, useRef, useState } from "react";
import API from "../../API";
import { toast } from "react-toastify";
import { useAuthContext } from "../../Context/AuthContext";

const DashBoard = ({ studentList }) => {
  const [statistics, setStatistics] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const { tokenExpire } = useAuthContext();

  useEffect(() => {
    API.get("/student/stat")
      .then((res) => {
        setStatistics([
          ...statistics,
          { grade: "1학년", count: res.data.count[1] },
          { grade: "2학년", count: res.data.count[2] },
          { grade: "3학년", count: res.data.count[3] },
        ]);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          tokenExpire();
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
      });
    const loop = setInterval(() => {
      API.get("/student/stat")
        .then((res) => {
          setStatistics([
            { grade: "1학년", count: res.data.count[1] },
            { grade: "2학년", count: res.data.count[2] },
            { grade: "3학년", count: res.data.count[3] },
          ]);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            tokenExpire();
          } else {
            toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
          }
        });
    }, 3000);
    return () => {
      clearInterval(loop);
    };
  }, []);

  useEffect(() => {
    setGradeData([
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
    ]);
  }, [studentList]);

  const colors = ["#ef7c6a", "#333333", "#eeaa77"];

  return (
    <div className="dashBoard">
      <div className="dashBoardSlot">
        <div className="barChartWrapper">
          <BarChart width={200} height={130} data={statistics}>
            <Bar dataKey="count" isAnimationActive={false}>
              {gradeData.map((entry, index) => (
                <Cell fill={colors[index % colors.length]} />
              ))}
              <LabelList
                stroke="none"
                dataKey="count"
                position="inside"
                style={{ fontSize: "80%", fill: "#ffffff", fontWeight: "bold" }}
              />
            </Bar>
          </BarChart>
        </div>
      </div>
      <div className="pieChartWrapper">
        <PieChart width={250} height={140} data={gradeData}>
          <Pie
            startAngle={90}
            endAngle={450}
            innerRadius={25}
            outerRadius={55}
            fill="#8884d8"
            data={gradeData}
            cx="50%"
            cy="50%"
            dataKey="count"
            nameKey="grade"
            isAnimationActive={false}
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
          <Legend wrapperStyle={{ position: "absolute", left:"240px", top:"100px", fontSize: "80%", fontWeight: "bold" }} />
        </PieChart>
      </div>
    </div>
  );
};

export default DashBoard;
