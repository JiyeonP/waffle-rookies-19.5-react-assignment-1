import "./ViewProfile.css";
import { useState, useEffect } from "react";
import { useStudentContext } from "../../Context/StudentContext";
import { useHistory } from "react-router-dom";

const ViewProfile = () => {
  const { selectedStudent } = useStudentContext();

  const history = useHistory();

  const goDetail = () => history.push(`/student/${selectedStudent.id}`);

  return (
    <div className="profile1Wrapper">
      {!selectedStudent.id ? (
        <div className="emptyView">왼쪽 표에서 학생을 선택해 주세요.</div>
      ) : (
        <div className="profile1Page">
          <div className="profile1Header">
            <img
              className="goDetailImg"
              onClick={goDetail}
              src="https://cdn-icons-png.flaticon.com/512/724/724938.png"
              alt="상세 페이지로"
            />
          </div>
          <div className="profile1ImgWrapper">
            {selectedStudent.profileImg ? (
              <img
                className="profile1Img"
                src={selectedStudent.profileImg}
                alt="profile img"
              />
            ) : (
              <img
                className="profile1Img"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                alt="no profile img"
              />
            )}
          </div>
          <div className="profile1">
            <div className="profile1Line">
              <p className="profile1Index">이름</p>
              <div className="profile1Value"> {selectedStudent.name}</div>
            </div>
            <div className="profile1Line">
              <p className="profile1Index">학년</p>
              <div className="profile1Value"> {selectedStudent.grade}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProfile;
