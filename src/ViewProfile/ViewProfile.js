import "./ViewProfile.css";
import { useState } from "react";

const ViewProfile = ({stdList, selectedStd, stdChange, stdDelete}) => {
  const [newName, setNewName] = useState(selectedStd.name );
  const [newGrade, setNewGrade] = useState(selectedStd.grade);
  const [newProfileImg, setNewProfileImg] = useState(selectedStd.profileImg);

  const handleStdChange = () => {
    const changedStd = {
      id: selectedStd.id,
      name: newName,
      grade: newGrade,
      profileImg: newProfileImg,
    };
    if (
      stdList.filter(
        (item) =>
          item.id !== selectedStd.id &&
          item.name === selectedStd.name &&
          item.grade === selectedStd.grade
      ) > 0
    ) {
      return window.alert("해당 학년에 동명이인이 존재합니다. (수정 불가)");
    }
    stdChange(changedStd);
  };

  const handleStdDelete = () => {
    stdDelete(selectedStd);
  };

  return (
    <div className="Empty">
      왼쪽 표에서 학생을 선택해 주세요.
      <div className={`editPage ${selectedStd? 'selected':''}`}>
        <div className="profileHeader">
          <button className="saveButton" onClick={handleStdChange}>
            저장
          </button>
          <button className="deleteButton" onClick={handleStdDelete}>
            삭제
          </button>
        </div>
        <div className="editLine">
          <p className="editIndex">이름</p>
          <input
            className="editInput"
            placeholder="이름을 입력하세요."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </div>
        <div className="editLine">
          <p className="editIndex">학년</p>
          <input
            className="editInput"
            type="number"
            min="1"
            max="3"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
          />
        </div>
        <div className="editLine">
          <p className="editIndex">프로필</p>
          <input
            className="addInput"
            placeholder="프로필 사진 주소를 입력하세요."
            value={newProfileImg}
            onChange={(e) => setNewProfileImg(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;
