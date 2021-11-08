import "./ControlBar.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const ControlBar = ({ searchKeys }) => {
  const history = useHistory();
  const [searchName, setSearchName] = useState(searchKeys.get("name"));
  const [searchGrade, setSearchGrade] = useState(searchKeys.get("grade"));

  const goSearched = () => {
    const newParams = new URLSearchParams();
    searchGrade && newParams.set("grade", searchGrade);
    searchName && newParams.set("name", searchName);
    history.push({ pathname: "/students", search: `${newParams}` });
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
