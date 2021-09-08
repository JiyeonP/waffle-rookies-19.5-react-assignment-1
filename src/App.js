import "./App.css";
import { useState } from "react";
import Header from "./Header/Header.js";
import DashBoard from "./DashBoard/DashBoard";
import StudentList from "./StudentList/StudentList";
import ViewProfile from "./ViewProfile/ViewProfile";

function App() {
  const [stdList, setStdList] = useState([]);

  const stdAdd = (newStd) => {
    setStdList([...stdList, newStd]);
  };

  const stdChange = (id, props) => {
    const targetIndex = stdList.findIndex((item) => item.id === id);
    const newStdList = stdList.slice();
    const targetStd = {
      ...stdList[targetIndex],
      name: props.name,
      grade: props.grade,
      profile: props.profile,
    };
    newStdList.splice(targetIndex, 1, targetStd);

    setStdList(newStdList);
  };

  const stdDelete = (id) => {
    const newStdList = stdList.filter((item) => item.id !== id);
    setStdList(newStdList);
  };

  return (
    <div className="App">
        <Header />
        <DashBoard stdList={stdList}/>
    </div>
  );
}

export default App;
