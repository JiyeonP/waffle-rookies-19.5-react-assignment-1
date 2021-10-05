import "./MainPage.css";
import {useEffect, useState} from "react";
import Header from "./Header/Header";
import DashBoard from "./DashBoard/DashBoard";
import ControlBar from "./StudentList/ControlBar";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";
import AddStudent from "./AddStudent/AddStudent";
import { withCookies, Cookies } from "react-cookie";
import PopUp from "./PopUp/PopUp";

const MainPage = (props) => {
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const [cookies, setCookies] = useState(props.cookies);
  const [showPopUp, setShowPopUp] = useState(true);

  useEffect(() => {
    if (cookies) {
      const currentCookie = cookies.get('PopUp-close24');
      setShowPopUp(!currentCookie);
    } else {
      setCookies(props.cookies);
    }
  }, [props.cookies])

  const handleAddStudent = (v) => {
    setAddStudent(v);
  };

  const closePopUp = (check24) => {
    if (cookies) {
      if (check24) {
        cookies.set('PopUp-close24', true, {path: '/', expires: new Date(Date.now()+1000*3600*24)})
      }
    }
    setShowPopUp(false);
  }

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
        {showPopUp && !cookies.get('PopUp-close24') && <PopUp closePopUp={closePopUp}/>}
      </div>
    </div>
  );
};

export default withCookies(MainPage);
