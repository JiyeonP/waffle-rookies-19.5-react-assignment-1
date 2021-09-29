import "./StudentList.css";
import Student from "./Student";
import { useStudentContext } from "../../Context/StudentContext";

const StudentList = ({ searchKey }) => {
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext();
  const showList = studentList.filter((item) => item.name.includes(searchKey));

  const selectChange = (targetStudent) => {
    if (selectedStudent !== targetStudent) {
      setSelectedStudent(targetStudent);
    } else {
      setSelectedStudent({
        id: false,
        name: false,
        grade: false,
        profileImg: false,
      });
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
              selected={selectedStudent.id === item.id}
              selectChange={selectChange}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentList;
