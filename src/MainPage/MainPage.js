import "./MainPage.css";
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import DashBoard from "./DashBoard/DashBoard";
import ControlBar from "./StudentList/ControlBar";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";
import AddStudent from "./AddStudent/AddStudent";
import { useCookies } from "react-cookie";
import PopUp from "./PopUp/PopUp";
import { css } from "@emotion/react";
import { PuffLoader } from "react-spinners";
import API from "../API";
import { toast } from "react-toastify";

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [studentList, setStudentList] = useState([]);

  const [cookies, setCookie, removeCookie] = useCookies(["popUpClose24"]);
  const [showPopUp, setShowPopUp] = useState(true);

  const mainLoaderCss1 = css`
    position: absolute;
    top: 250px;
    left: calc(50% - 170px);
  `;
  const mainLoaderCss2 = css`
    position: absolute;
    top: 250px;
    left: calc(50% + 20px);
  `;

  useEffect(() => {
    if (cookies.popUpClose24) {
      setShowPopUp(false);
    }
    setLoading(true);
    API.get("/student")
      .then((res) => {
        setStudentList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        removeCookie("popUpClose24");
        setLoading(false);
      });
  }, []);

  const handleAddStudent = (v) => {
    setAddStudent(v);
  };

  const closePopUp = (check24) => {
    if (check24) {
      setCookie("popUpClose24", true, {
        path: "/",
        expires: new Date(Date.now() + 1000 * 3600 * 24),
      });
    } else {
      removeCookie("popUpClose24");
    }
    setShowPopUp(false);
  };

  const selectedStudent =
    selectedStudentId === null
      ? null
      : studentList.find((student) => student.id === selectedStudentId);

  return (
    <div className="Wrapper">
      <div className="mainPage">
        <Header />
        <DashBoard studentList={studentList} />
        <ControlBar
          setSearchKey={setSearchKey}
          searchKey={searchKey}
          handleAddStudent={handleAddStudent}
        />
        <StudentList
          studentList={studentList}
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          searchKey={searchKey}
        />
        <div className="divideLine" />
        <ViewProfile
          setLoading={setLoading}
          selectedStudent={selectedStudent}
        />
        <AddStudent
          setLoading={setLoading}
          setSelectedStudentId={setSelectedStudentId}
          addStudent={addStudent}
          handleAddStudent={handleAddStudent}
        />
        {showPopUp && <PopUp closePopUp={closePopUp} />}
      </div>
      <PuffLoader
        color="#af96e1"
        loading={loading}
        css={mainLoaderCss1}
        size={150}
        speedMultiplier={2}
      />
      <PuffLoader
        color="#f1df96"
        loading={loading}
        css={mainLoaderCss2}
        size={150}
        speedMultiplier={2}
      />
    </div>
  );
};

export default MainPage;
