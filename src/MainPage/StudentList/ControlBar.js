import "./ControlBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ControlBar = () => {
  const history = useHistory();
  const [searchName, setSearchName] = useState("");
  const [searchGrade, setSearchGrade] = useState("");

  const goSearched = () => {
    if (searchName.length !== 0) {
      if (searchGrade.length !== 0) {
        history.push({
          pathname: "/students",
          search: `?name=${searchName}&grade=${searchGrade}`,
        });
      } else {
        history.push({
          pathname: "/students",
          search: `?name=${searchName}`,
        });
      }
    } else {
      if (searchGrade.length !== 0) {
        history.push({
          pathname: "/students",
          search: `grade=${searchGrade}`,
        });
      } else {
        history.push("/students");
      }
    }
  };

  const handleName = (e) => {
    console.log(e.target.value);
    setSearchName(e.target.value);
  };

  return (
    <div className="controlBar">
      <input
        className="search"
        placeholder="이름"
        value={searchName}
        onChange={handleName}
      />
      <input
        className="search"
        placeholder="학년"
        value={searchGrade}
        onChange={(e) => {
          setSearchGrade(e.target.value);
        }}
        type="number"
      />
      <button className="searchButton" onClick={goSearched}>
        검색
      </button>
    </div>
  );
};

export default ControlBar;
