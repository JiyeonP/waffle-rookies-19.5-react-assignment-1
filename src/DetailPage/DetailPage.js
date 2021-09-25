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
  const params = useParams();
  const [changedStudent, setChangedStudent] = useState({});
  const [deleteClicked, setDeleteClicked] = useState(false);
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext();

  const history = useHistory();

  useEffect(() => {
    setChangedStudent({
      ...selectedStudent,
      email:
        selectedStudent.email === "@waffle.hs.kr"
          ? ""
          : selectedStudent.email.substring(0, -13),
    });
  }, [selectedStudent]);

  const handleEmailChange = (e) => {
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
          email: changedStudent.email.concat("@waffle.hs.kr"),
        };
      } else {
        return student;
      }
    });
    setSelectedStudent(changedStudent);
    setStudentList(newStudentList);
    history.push("/students");
  };

  const handleDelete = () => {
    setDeleteClicked(!deleteClicked);
  };

  const handleLock = () => {
    setChangedStudent({ ...changedStudent, locked: !changedStudent.locked });
  };

  return (
    <div className="detailWrapper">
      <div className="detailPage">
        <Buttons
          changedStudent={changedStudent}
          setChangedStudent={setChangedStudent}
          handleSave={handleSave}
          handleDelete={handleDelete}
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
          handleDelete={handleDelete}
        />
        {changedStudent.locked ? <LockBox /> : null}
      </div>
    </div>
  );
};

export default DetailPage;
