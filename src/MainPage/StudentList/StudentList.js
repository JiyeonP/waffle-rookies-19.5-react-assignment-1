import "./StudentList.css";
import Student from "./Student";
import { useStudentContext } from "../../Context/StudentContext";
import API from "../../API";
import {useEffect} from "react";

const StudentList = ({ searchKey }) => {
  const { selectedStudentId, setSelectedStudentId, setLoading } =
    useStudentContext();
  let studentList=[];

  useEffect(()=>{
    setLoading(true);
    API.get("/student").then((res)=>{
      studentList = res.data;
    })
    setLoading(false);
  }, [selectedStudentId])

  const showList = studentList.filter((item) => item.name.includes(searchKey));

  const selectChange = (changedStudent) => {
    if (selectedStudentId !== changedStudent.id) {
      setSelectedStudentId(changedStudent.id);
    } else {
      setSelectedStudentId(false);
    }
  };

  return (
    <div className="listBox">
      <div className="listHeader">
        <p className="headerComp">이름</p>
        <p className="headerComp">학년</p>
      </div>
      {!studentList.length ? (
        <div className="emptyList">학교에 학생이 없어요 :(</div>
      ) : (
        <ul className="studentList">
          {showList.map((item) => (
            <Student
              key={item.id}
              student={item}
              selected={selectedStudentId === item.id}
              selectChange={selectChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
