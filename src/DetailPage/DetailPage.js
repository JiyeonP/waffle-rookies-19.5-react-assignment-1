import "./DetailPage.css";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Profile from "./Profile/Profile";
import Buttons from "./Buttons/Buttons";
import { useStudentContext } from "../Context/StudentContext";
import Information from "./Information/Information";
import DeleteConfirm from "./DeleteConfirm/DeleteConfirm";
import Comments from "./Comments/Comments";
import LockBox from "./Information/LockBox";
import {toast} from "react-toastify";

const DetailPage = () => {
  const { studentList, setStudentList } = useStudentContext();
  const params = useParams();
  const history = useHistory();
  const targetStudent = {
    ...studentList.find((item) => item.id.toString() === params.id),
    email: studentList
      .find((item) => item.id.toString() === params.id)
      .email.split("@")[0],
  };

  const [changedStudent, setChangedStudent] = useState(targetStudent);

  const [deleteClicked, setDeleteClicked] = useState(false);

  const handleEmailChange = (e) => {
    if (e.target.value.includes("@")) {
      toast.error("@는 사용할 수 없습니다.");
      return;
    }
    const newChangedStudent = { ...changedStudent, email: e.target.value };
    setChangedStudent(newChangedStudent);
  };

  const handlePhoneChange = (values) => {
    const { value } = values;
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
    const newChangedStudent = { ...changedStudent, profile_img: e.target.value };
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
  };

  const handleConfirm = (v) => {
    setDeleteClicked(v);
  };

  const handleLock = () => {
    setChangedStudent({ ...targetStudent, locked: !changedStudent.locked });
    const newStudentList = studentList.map((student) => {
      if (student.id === changedStudent.id) {
        return { ...student, locked: !changedStudent.locked };
      } else {
        return student;
      }
    });
    setStudentList(newStudentList);
  };

  const handleCancel = () => {
    console.log("cancel applied");
    setChangedStudent({
      ...targetStudent,
      email: targetStudent.email.split("@")[0],
      locked: false,
    });
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
          handleCancel={handleCancel}
          handleSave={handleSave}
          handleConfirm={handleConfirm}
          handleLock={handleLock}
        />
        <Profile
          changedStudent={changedStudent}
        />
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
