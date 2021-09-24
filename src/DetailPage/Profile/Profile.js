import "./Profile.css";
import { useState, useEffect } from "react";
import { useStudentContext } from "../../Context/StudentContext";

const Profile = () => {
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext();

  return (
    <div>
      {selectedStudent.profileImg ? (
        <img
          className="profile2Img"
          src={selectedStudent.profileImg}
          alt="profile img"
        />
      ) : (
        <img
          className="profile2Img"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
          alt="no profile img"
        />
      )}
      <div className="profile2">
        <div className="profile2Line">
          <p className="profile2Index">이름</p>
          <div className="profile2Value"> {selectedStudent.name}</div>
        </div>
        <div className="profile2Line">
          <p className="profile2Index">학년</p>
          <div className="profile2Value"> {selectedStudent.grade}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;