import "./MainPage.css";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import DashBoard from "./DashBoard/DashBoard";
import ControlBar from "./StudentList/ControlBar";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";
import AddStudent from "./AddStudent/AddStudent";
import { withCookies } from "react-cookie";
import PopUp from "./PopUp/PopUp";
import { css } from "@emotion/react";
import {BounceLoader} from "react-spinners";

const MainPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const [cookies, setCookies] = useState(props.cookies);
  const [showPopUp, setShowPopUp] = useState(true);

  const mainLoaderCss1 = css`position: absolute; top: 250px; left: calc(50% - 170px)`;
  const mainLoaderCss2 = css`position: absolute; top: 250px; left: calc(50% + 20px)`;

  useEffect(() => {
    if (cookies) {
      const currentCookie = cookies.get("PopUp-close24");
      setShowPopUp(!currentCookie);
    } else {
      setCookies(props.cookies);
    }
  }, [props.cookies]);

  const handleAddStudent = (v) => {
    setAddStudent(v);
  };

  const closePopUp = (check24) => {
    if (cookies) {
      if (check24) {
        cookies.set("PopUp-close24", true, {
          path: "/",
          expires: new Date(Date.now() + 1000 * 3600 * 24),
        });
      }
    }
    setShowPopUp(false);
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
        <StudentList
          setLoading={setLoading}
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          searchKey={searchKey}
        />
        <div className="divideLine" />
        <ViewProfile
          setLoading={setLoading}
          selectedStudentId={selectedStudentId}
        />
        <AddStudent
          setLoading={setLoading}
          setSelectedStudentId={setSelectedStudentId}
          addStudent={addStudent}
          handleAddStudent={handleAddStudent}
        />
        {showPopUp && !cookies.get("PopUp-close24") && (
          <PopUp closePopUp={closePopUp} />
        )}
      </div>
      <BounceLoader color="#af96e1" loading={loading} css={mainLoaderCss1} size={150} speedMultiplier={2}/>
      <BounceLoader color="#f1df96" loading={loading} css={mainLoaderCss2} size={150} speedMultiplier={2}/>
    </div>
  );
};

export default withCookies(MainPage);
