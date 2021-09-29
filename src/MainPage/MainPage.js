import "./MainPage.css";
import { useState } from "react";
import Header from "./Header/Header";
import DashBoard from "./DashBoard/DashBoard";
import ControlBar from "./StudentList/ControlBar";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";
import AddStudent from "./AddStudent/AddStudent";

const MainPage = () => {
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const handleAddStudent = () => {
    setAddStudent(!addStudent);
  };

  return (
    <div className="Wrapper">
      <div className="mainPage">
        <Header />
        <DashBoard />
        <ControlBar
          setSearchKey={setSearchKey}
          searchKey={searchKey}
          handleAddStudent={handleAddStudent}
        />
        <StudentList searchKey={searchKey} />
        <div className="divideLine" />
        <ViewProfile />
        <AddStudent
          addStudent={addStudent}
          handleAddStudent={handleAddStudent}
        />
      </div>
    </div>
  );
};

export default MainPage;
