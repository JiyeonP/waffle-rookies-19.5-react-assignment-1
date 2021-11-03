import "./StudentList.css";
import Student from "./Student";
import API from "../../API";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {useAuthContext} from "../../Context/AuthContext";

const StudentList = ({ studentList, selectedStudentId, setSelectedStudentId, searchKey }) => {

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
