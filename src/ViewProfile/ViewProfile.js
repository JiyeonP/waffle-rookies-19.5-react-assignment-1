import "./ViewProfile.css";
import { useState, useEffect } from "react";

const ViewProfile = ({
  studentList,
  selectedStudent,
  setSelectedStudent,
  studentChange,
  studentDelete,
}) => {
  const [changedStudent, setChangedStudent] = useState(selectedStudent);

  useEffect(() => {
    setChangedStudent(selectedStudent);
  }, [selectedStudent]);

  const handleNameChange = (e) => {
    const newChangedStudent = { ...changedStudent, name: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handleGradeChange = (e) => {
    const newChangedStudent = {
      ...changedStudent,
      grade: Number(e.target.value),
    };
    setChangedStudent(newChangedStudent);
  };

  const handleProfileImgChange = (e) => {
    const newChangedStudent = { ...changedStudent, profileImg: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handleSave = () => {
    if (
      ![2, 3].includes(changedStudent.name.length) ||
      ![1, 2, 3].includes(Number(changedStudent.grade))
    ) {
      return window.alert("이름 또는 학년이 올바르지 않습니다.");
    }

    if (
      studentList.find(
        (item) =>
          item.id !== changedStudent.id &&
          item.name === changedStudent.name &&
          item.grade === changedStudent.grade
      )
    ) {
      return window.alert("해당 학년에 동명이인이 존재합니다. (수정 불가)");
    }

    studentChange(changedStudent);
  };

  const handleStudentDelete = () => {
    studentDelete(selectedStudent.id);
    setSelectedStudent({
      id: false,
      name: false,
      grade: false,
      profileImg: false,
    });
  };

  return (
    <div className="profileWrapper">
      {!selectedStudent.id ? (
        <div className="empty">왼쪽 표에서 학생을 선택해 주세요.</div>
      ) : (
        <div className="profilePage">
          <div className="profileHeader">
            <button className="saveButton" onClick={handleSave}>
              저장
            </button>
            <button className="deleteButton" onClick={handleStudentDelete}>
              삭제
            </button>
          </div>
          {selectedStudent.profileImg ? (
            <img
              className="profileImg"
              src={selectedStudent.profileImg}
              alt="profile img"
            />
          ) : (
            <img
              className="profileImg"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
              alt="no profile img"
            />
          )}
          <div className="editPage">
            <div className="editLine">
              <p className="editIndex">이름</p>
              <input
                className="editInput"
                placeholder="이름을 입력하세요."
                value={changedStudent.name}
                onChange={(e) => handleNameChange(e)}
              />
            </div>
            <div className="editLine">
              <p className="editIndex">학년</p>
              <input
                className="editInput"
                type="number"
                min="1"
                max="3"
                value={changedStudent.grade}
                onChange={(e) => handleGradeChange(e)}
              />
            </div>
            <div className="editLine">
              <p className="editIndex">프로필</p>
              <input
                className="editInput"
                placeholder="프로필 사진 주소를 입력하세요."
                value={changedStudent.profileImg}
                onChange={(e) => handleProfileImgChange(e)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
