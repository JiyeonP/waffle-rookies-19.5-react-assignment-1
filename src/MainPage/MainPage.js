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
import { PuffLoader } from "react-spinners";
import API from "../API";
import { toast } from "react-toastify";
import {useAuthContext} from "../Context/AuthContext";

const MainPage = (props) => {
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [studentList, setStudentList] = useState([]);
  const {setLogin} = useAuthContext();

  const [cookies, setCookies] = useState(props.cookies);
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
    if (cookies) {
      const currentCookie = cookies.get("PopUp-close24");
      setShowPopUp(!currentCookie);
    } else {
      setCookies(props.cookies);
    }
  }, [props.cookies]);

  useEffect(() => {
    setLoading(true);
    API.get("/student")
      .then((res) => {
        setStudentList(res.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("토큰이 만료되었습니다.");
          localStorage.setItem("isLogin", "no");
          localStorage.setItem("token", "none");
          setLogin(false);
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
        setLoading(false);
      });
  }, [selectedStudentId]);

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

export default withCookies(MainPage);
