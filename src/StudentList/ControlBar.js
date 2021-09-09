import "./ControlBar.css";
import { useState } from "react";

const ControlBar = ({searchList, startStdAdd}) => {
    const [searchKey, setSearchKey] = useState('');

    const handleSearchList = (e) => {
        searchList(searchKey)
        setSearchKey(e.target.value)
        searchList(searchKey)
    }
  return (
    <div className="controlBar">
      <input
          className="search"
          placeholder="검색"
          value={searchKey}
          onChange={(e) => {handleSearchList(e)}}
      />
      <button className="addButton" onClick={startStdAdd}>
        추가
      </button>
    </div>
  );
};

export default ControlBar;
