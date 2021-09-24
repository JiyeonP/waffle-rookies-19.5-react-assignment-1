import "./AddStudent.css";
import { useState } from "react";
import {useStudentContext} from "../../Context/StudentContext";

const AddStudent = ({
  addStudent,
  handleAddStudent,
}) => {
  const {studentList, setStudentList, selectedStudent, setSelectedStudent} = useStudentContext();
  const [name, setName] = useState("");
  const [grade, setGrade] = useState(NaN);
  const [profileImg, setProfileImg] = useState("");

  const handleStudentAdd = () => {
    if (!name || !grade) {
      return window.alert("이름과 학년을 모두 입력하세요.");
    }

    if (![2, 3].includes(name.length)) {
      return window.alert("이름을 다시 확인해주세요. (두 글자/세 글자 입력)");
    }

    if (![1, 2, 3].includes(Number(grade))) {
      return window.alert("학년을 다시 확인해주세요. (1, 2, 3 중 입력)");
    }

    if (
      studentList.find(
        (item) =>
          item.name === name && item.grade === Number(grade)
      )
    ) {
      return window.alert("해당 학년에 동명이인이 존재합니다. (추가 불가)");
    }

    const newStudent = {
      id: Math.random(),
      name: name,
      grade: Number(grade),
      phone: '',
      email: '@waffle.hs.kr',
      major: 'frontend',
      profileImg: '',
      locked: false,
    };

    setStudentList([...studentList, newStudent]);
    setSelectedStudent(newStudent);
    handleClose();
  };

  const handleClose = () => {
    handleAddStudent();
    setName("");
    setGrade(NaN);
    setProfileImg("");
  };

  return (
    <div className={`wrapper ${addStudent ? "show" : ""}`}>
      <div className="backBox" onClick={handleClose} />
      <div className="studentAddPage">
        <div className="addLine">
          <p className="addIndex">이름</p>
          <input
            className="addInput"
            placeholder="이름을 입력하세요. (한글)"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
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
