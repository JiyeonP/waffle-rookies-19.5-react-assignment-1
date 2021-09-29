import "./DetailPage.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Profile from "./Profile/Profile";
import Buttons from "./Buttons/Buttons";
import { useStudentContext } from "../Context/StudentContext";
import Information from "./Information/Information";
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm";
import Comments from "./Comments/Comments";
import LockBox from "./Information/LockBox";

const DetailPage = () => {
  const { studentList, setStudentList } = useStudentContext();
  const params = useParams();
  const history = useHistory();
  const targetStudent = studentList.find(
    (item) => item.id.toString() === params.id
  );
  const [changedStudent, setChangedStudent] = useState({
    ...targetStudent,
    email: targetStudent.email.split("@")[0],
  });
  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleEmailChange = (e) => {
    if (e.target.value.includes("@")) {
      window.alert("@는 사용할 수 없습니다.");
      return;
    }
    const newChangedStudent = { ...changedStudent, email: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handlePhoneChange = (values) => {
    const { formattedValue, value } = values;
    const newChangedStudent = {
      ...changedStudent,
      phone: value,
    };
    setChangedStudent(newChangedStudent);
  };

  const handleMajorChange = (e) => {
    const newChangedStudent = { ...changedStudent, major: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handleProfileImgChange = (e) => {
    const newChangedStudent = { ...changedStudent, profileImg: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handleSave = () => {
    const newStudentList = studentList.map((student) => {
      if (student.id === changedStudent.id) {
        return {
          ...changedStudent,
          email: changedStudent.email + "@waffle.hs.kr",
        };
      } else {
        return student;
      }
    });
    setStudentList(newStudentList);
    history.push("/students");
  };

  const handleConfirm = (v) => {
    setDeleteClicked(v);
  };

  const handleLock = () => {
    setChangedStudent({ ...changedStudent, locked: !changedStudent.locked });
    const newStudentList = studentList.map((student) => {
      if (student.id === changedStudent.id) {
        return { ...student, locked: !student.lock };
      } else {
        return student;
      }
    });
    setStudentList(newStudentList);
  };

  const handleDelete = () => {
    const newStudentList = studentList.filter(
      (item) => item.id !== changedStudent.id
    );
    setStudentList(newStudentList);
    history.push("/students");
  };

  return (
    <div className="detailWrapper">
      <div className="detailPage">
        <Buttons
          changedStudent={changedStudent}
          setChangedStudent={setChangedStudent}
          handleSave={handleSave}
          handleConfirm={handleConfirm}
          handleLock={handleLock}
        />
        <Profile />
        <Information
          changedStudent={changedStudent}
          handleEmailChange={handleEmailChange}
          handleMajorChange={handleMajorChange}
          handlePhoneChange={handlePhoneChange}
          handleProfileImgChange={handleProfileImgChange}
        />
        <Comments />
        <DeleteConfirm
          deleteClicked={deleteClicked}
          onConfirm={handleDelete}
          onCancel={() => handleConfirm(false)}
        />
        {changedStudent.locked ? <LockBox /> : null}
      </div>
    </div>
  );
};

export default DetailPage;
