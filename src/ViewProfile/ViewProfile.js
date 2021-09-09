import "./ViewProfile.css";
import { useState, useEffect } from "react";

const ViewProfile = ({
  stdList,
  selectedStd,
  setSelectedStd,
  stdChange,
  stdDelete,
}) => {
  const [changedStd, setChangedStd] = useState(selectedStd);

  useEffect(() => {
    setChangedStd(selectedStd);
  }, [selectedStd]);

  const handleNameChange = (e) => {
    const newChangedStd = { ...changedStd, name: e.target.value };
    setChangedStd(newChangedStd);
  };

  const handleGradeChange = (e) => {
    const newChangedStd = { ...changedStd, grade: Number(e.target.value) };
    setChangedStd(newChangedStd);
  };

  const handleProfileImgChange = (e) => {
    const newChangedStd = { ...changedStd, profileImg: e.target.value };
    setChangedStd(newChangedStd);
  };

  const handleSave = () => {
    if (
      ![2, 3].includes(changedStd.name.length) ||
      ![1, 2, 3].includes(Number(changedStd.grade))
    ) {
      return window.alert("이름 또는 학년이 올바르지 않습니다.");
    }

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
    stdDelete(selectedStd.id);
    setSelectedStd({ id: false, name: false, grade: false, profileImg: false });
  };

  return (
    <div className="profileWrapper">
      {!selectedStd.id ? (
        <div className="empty">왼쪽 표에서 학생을 선택해 주세요.</div>
      ) : (
        <div className="profilePage">
          <div className="profileHeader">
            <button className="saveButton" onClick={handleSave}>
              저장
            </button>
            <button className="deleteButton" onClick={handleStdDelete}>
              삭제
            </button>
          </div>
          {selectedStd.profileImg ? (
            <img
              className="profileImg"
              src={selectedStd.profileImg}
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
                value={changedStd.name}
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
                value={changedStd.grade}
                onChange={(e) => handleGradeChange(e)}
              />
            </div>
            <div className="editLine">
              <p className="editIndex">프로필</p>
              <input
                className="editInput"
                placeholder="프로필 사진 주소를 입력하세요."
                value={changedStd.profileImg}
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
