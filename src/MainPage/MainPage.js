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
import { useLocation } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import styled from "styled-components";

const MainPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const [loading, setLoading] = useState(true);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [addStudent, setAddStudent] = useState(false);
  const [studentList, setStudentList] = useState([]);
  const { tokenExpire } = useAuthContext();

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

  const Wrapper = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  `;

  const Main = styled.div`
    margin: auto;
    height: 100%;
    width: 760px;
    top: 20px;
    background-color: white;
  `;

  const DivideLine = styled.div`
    margin: auto;
    height: 100%;
    width: 760px;
    top: 20px;
    background-color: white;
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
        if (error.response.status === 401) {
          tokenExpire();
        } else if (error.response.status === 400) {
          toast.error(error.response.data.message);
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
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

  return (
    <Wrapper>
      <Main>
        <Header />
        <DashBoard studentList={studentList} />
        <ControlBar />
        <StudentList
          studentList={studentList}
          selectedStudentId={selectedStudentId}
          setSelectedStudentId={setSelectedStudentId}
          searchKeys={params}
          handleAddStudent={handleAddStudent}
        />
        <DivideLine />
        <ViewProfile
            studentList={studentList}
          selectedStudentId={selectedStudentId}
        />
        <AddStudent
          studentList={studentList}
          setStudentList={setStudentList}
          setLoading={setLoading}
          setSelectedStudentId={setSelectedStudentId}
          addStudent={addStudent}
          handleAddStudent={handleAddStudent}
        />
        {showPopUp && <PopUp closePopUp={closePopUp} />}
      </Main>
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
    </Wrapper>
  );
};

export default MainPage;
