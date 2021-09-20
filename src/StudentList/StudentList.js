import "./StudentList.css";
import Student from "./Student";

const StudentList = ({
  studentList,
  searchKey,
  selectedStudent,
  selectChange,
}) => {
  const showList = studentList.filter((item) => item.name.includes(searchKey));

  return (
    <div className="listBox">
      <div className="listHeader">
        <p className="headerComp">이름</p>
        <p className="headerComp">학년</p>
      </div>
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
    </div>
  );
};

export default StudentList;
