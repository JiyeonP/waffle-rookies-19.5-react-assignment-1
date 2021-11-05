import "./StudentList.css";
import Student from "./Student";
import {useEffect, useState} from "react";

const StudentList = ({
  studentList,
  selectedStudentId,
  setSelectedStudentId,
  searchKeys,
  handleAddStudent,
}) => {
  const [showList, setShowList] = useState([]);

  useEffect(()=>{
    if (searchKeys.get("name") === null && searchKeys.get("grade") === null){
      setShowList(studentList);
    } else {
      if (searchKeys.get("grade") === null) {
        setShowList(
            studentList.filter((item) => item.name.includes(searchKeys.get("name")))
        );
      } else if (searchKeys.get("name") === null) {
        setShowList(
            studentList.filter((item) => item.grade === Number(searchKeys.get("grade")))
        );
      } else {
        setShowList(
            studentList.filter((item) => item.name.includes(searchKeys.get("name")) && item.grade === Number(searchKeys.get("grade")))
        );
      }
    }
  }, [studentList, searchKeys])

  const selectChange = (changedStudent) => {
    if (selectedStudentId !== changedStudent.id) {
      setSelectedStudentId(changedStudent.id);
    } else {
      setSelectedStudentId(false);
    }
  };

  return (
    <>
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
      <button className="addButton" onClick={() => handleAddStudent(true)}>
        추가
      </button>
    </>
  );
};

export default StudentList;
