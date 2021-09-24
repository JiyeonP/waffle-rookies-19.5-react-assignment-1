import "./AddStudent.css";
import { useState } from "react";

const AddStudent = ({
  studentList,
  addStudent,
  finStudentAdd,
  studentAdd,
  setSelectedStudent,
}) => {
  const [studentName, setStudentName] = useState("");
  const [studentGrade, setStudentGrade] = useState(NaN);
  const [studentProfileImg, setStudentProfileImg] = useState("");

  const handleStudentAdd = () => {
    if (!studentName || !studentGrade) {
      return window.alert("이름과 학년을 모두 입력하세요.");
    }

    if (![2, 3].includes(studentName.length)) {
      return window.alert("이름을 다시 확인해주세요. (두 글자/세 글자 입력)");
    }

    if (![1, 2, 3].includes(Number(studentGrade))) {
      return window.alert("학년을 다시 확인해주세요. (1, 2, 3 중 입력)");
    }

    if (
      studentList.find(
        (item) =>
          item.name === studentName && item.grade === Number(studentGrade)
      )
    ) {
      return window.alert("해당 학년에 동명이인이 존재합니다. (추가 불가)");
    }

    const newStudent = {
      id: Math.random(),
      name: studentName,
      grade: Number(studentGrade),
      profileImg: studentProfileImg,
    };

    studentAdd(newStudent);
    setSelectedStudent(newStudent);
    handleClose();
  };

  const handleClose = () => {
    finStudentAdd();
    setStudentName("");
    setStudentGrade(NaN);
    setStudentProfileImg("");
  };

  return (
    <div className={`wrapper ${addStudent ? "show" : ""}`}>
      <div className="backBox" />
      <div className="studentAddPage">
        <div className="addLine">
          <p className="addIndex">이름</p>
          <input
            className="addInput"
            placeholder="이름을 입력하세요. (한글)"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
        </div>
        <div className="addLine">
          <p className="addIndex">학년</p>
          <input
            className="addInput"
            placeholder="학년을 입력하세요. (숫자)"
            type="number"
            min="1"
            max="3"
            value={studentGrade}
            onChange={(e) => setStudentGrade(e.target.value)}
          />
        </div>
        <div className="addLine">
          <p className="addIndex">프로필</p>
          <input
            className="addInput"
            placeholder="프로필 사진 주소를 입력하세요."
            value={studentProfileImg}
            onChange={(e) => setStudentProfileImg(e.target.value)}
          />
        </div>
        <button className="close" onClick={handleClose}>
          닫기
        </button>
        <button className="add" onClick={handleStudentAdd}>
          추가
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
