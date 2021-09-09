import "./AddStudent.css";
import { useState } from "react";

const AddStudent = ({ stdList, addStd, finStdAdd, stdAdd, setSelectedStd }) => {
  const [stdName, setStdName] = useState("");
  const [stdGrade, setStdGrade] = useState(NaN);
  const [stdProfileImg, setStdProfileImg] = useState("");

  const handleStdAdd = () => {
    if (!stdName || !stdGrade) {
      return window.alert("이름과 학년을 모두 입력하세요.");
    }

    if (![2, 3].includes(stdName.length)) {
      return window.alert("이름을 다시 확인해주세요. (두 글자/세 글자 입력)");
    }

    if (![1, 2, 3].includes(Number(stdGrade))) {
      return window.alert("학년을 다시 확인해주세요. (1, 2, 3 중 입력)");
    }

    if (
      stdList.filter(
        (item) => item.name === stdName && item.grade === Number(stdGrade)
      ).length > 0
    ) {
      return window.alert("해당 학년에 동명이인이 존재합니다. (추가 불가)");
    }

    const newStd = {
      id: Math.random(),
      name: stdName,
      grade: Number(stdGrade),
      profileImg: stdProfileImg,
    };

    stdAdd(newStd);
    setSelectedStd(newStd);
    handleClose();
  };

  const handleClose = () => {
    finStdAdd();
    setStdName("");
    setStdGrade(NaN);
    setStdProfileImg("");
  };

  return (
    <div className={`wrapper ${addStd ? "show" : ""}`}>
      <div className="backBox" />
      <div className="stdAddPage">
        <div className="addLine">
          <p className="addIndex">이름</p>
          <input
            className="addInput"
            placeholder="이름을 입력하세요. (한글)"
            value={stdName}
            onChange={(e) => setStdName(e.target.value)}
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
            value={stdGrade}
            onChange={(e) => setStdGrade(e.target.value)}
          />
        </div>
        <div className="addLine">
          <p className="addIndex">프로필</p>
          <input
            className="addInput"
            placeholder="프로필 사진 주소를 입력하세요."
            value={stdProfileImg}
            onChange={(e) => setStdProfileImg(e.target.value)}
          />
        </div>
        <button className="close" onClick={handleClose}>
          닫기
        </button>
        <button className="add" onClick={handleStdAdd}>
          추가
        </button>
      </div>
    </div>
  );
};

export default AddStudent;
