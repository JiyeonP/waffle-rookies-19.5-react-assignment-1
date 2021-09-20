import "./App.css";
import { useState } from "react";
import Header from "./Header/Header.js";
import DashBoard from "./DashBoard/DashBoard";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";
import ControlBar from "./StudentList/ControlBar";
import AddStudent from "./AddStudent/AddStudent";

const dummyData = [
  {
    id: 1,
    name: "깃허브",
    grade: 1,
    profileImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
  },
  {
    id: 2,
    name: "빈학생",
    grade: 1,
    profileImg: "",
  },
  {
    id: 3,
    name: "리액트",
    grade: 2,
    profileImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
  },
  {
    id: 4,
    name: "스벨트",
    grade: 2,
    profileImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/1200px-Svelte_Logo.svg.png",
  },
  {
    id: 5,
    name: "리덕스",
    grade: 3,
    profileImg:
      "https://raw.githubusercontent.com/1ambda/1ambda.github.io/master/assets/images/redux/redux_logo.png?width=30%&height=30%",
  },
  {
    id: 6,
    name: "타스",
    grade: 3,
    profileImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
  },
  {
    id: 7,
    name: "싸쓰",
    grade: 3,
    profileImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1280px-Sass_Logo_Color.svg.png",
  },
];

function App() {
  const [studentList, setStudentList] = useState(dummyData);
  const [selectedStudent, setSelectedStudent] = useState({
    id: false,
    name: false,
    grade: false,
    profileImg: false,
  });
  const [addStudent, setAddStudent] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const startAddStudent = () => {
    setAddStudent(true);
  };

  const finStudentAdd = () => {
    setAddStudent(false);
  };

  const selectChange = (targetStudent) => {
    if (selectedStudent !== targetStudent) {
      setSelectedStudent(targetStudent);
    } else {
      setSelectedStudent({
        id: false,
        name: false,
        grade: false,
        profileImg: false,
      });
    }
  };

  const studentAdd = (newStudent) => {
    setStudentList([...studentList, newStudent]);
  };

  const studentChange = (changedStudent) => {
    const newStudentList = studentList.map((student) => {
      if (student.id === changedStudent.id) {
        return changedStudent;
      } else {
        return student;
      }
    });
    setStudentList(newStudentList);
  };

  const studentDelete = (id) => {
    const newStudentList = studentList.filter((item) => item.id !== id);
    setStudentList(newStudentList);
  };

  return (
    <div className="AppWrapper">
      <div className="App">
        <Header />
        <DashBoard studentList={studentList} />
        <ControlBar
          setSearchKey={setSearchKey}
          searchKey={searchKey}
          startAddStudent={startAddStudent}
        />
        <StudentList
          studentList={studentList}
          searchKey={searchKey}
          selectedStudent={selectedStudent}
          selectChange={selectChange}
          selectChange={selectChange}
        />
        <div className="divideLine" />
        <ViewProfile
          studentList={studentList}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
          studentChange={studentChange}
          studentDelete={studentDelete}
        />
        <AddStudent
          studentList={studentList}
          addStudent={addStudent}
          finStudentAdd={finStudentAdd}
          studentAdd={studentAdd}
          setSelectedStudent={setSelectedStudent}
        />
      </div>
    </div>
  );
}

export default App;
