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
  const [stdList, setStdList] = useState(dummyData);
  const [selectedStd, setSelectedStd] = useState({
    id: false,
    name: false,
    grade: false,
    profileImg: false,
  });
  const [addStd, setAddStd] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const startStdAdd = () => {
    setAddStd(true);
  };

  const finStdAdd = () => {
    setAddStd(false);
  };

  const selectStd = (targetStd) => {
    setSelectedStd(targetStd);
  };

  const unselectStd = () => {
    setSelectedStd({ id: false, name: false, grade: false, profileImg: false });
  };

  const stdAdd = (newStd) => {
    setStdList([...stdList, newStd]);
  };

  const stdChange = (changedStd) => {
    const targetIndex = stdList.findIndex((item) => item.id === changedStd.id);
    const newStdList = stdList.slice();
    newStdList.splice(targetIndex, 1, changedStd);

    setStdList(newStdList);
  };

  const stdDelete = (id) => {
    const newStdList = stdList.filter((item) => item.id !== id);
    setStdList(newStdList);
  };

  return (
    <div className="AppWrapper">
      <div className="App">
        <Header />
        <DashBoard stdList={stdList} />
        <ControlBar setSearchKey={setSearchKey} startStdAdd={startStdAdd} />
        <StudentList
          stdList={stdList}
          searchKey={searchKey}
          selectedStd={selectedStd}
          selectStd={selectStd}
          unselectStd={unselectStd}
        />
        <div className="divideLine" />
        (selectedStd &&{" "}
        <ViewProfile
          stdList={stdList}
          selectedStd={selectedStd}
          setSelectedStd={setSelectedStd}
          stdChange={stdChange}
          stdDelete={stdDelete}
        />
        )
        <AddStudent
          stdList={stdList}
          addStd={addStd}
          finStdAdd={finStdAdd}
          stdAdd={stdAdd}
          setSelectedStd={setSelectedStd}
        />
      </div>
    </div>
  );
}

export default App;
