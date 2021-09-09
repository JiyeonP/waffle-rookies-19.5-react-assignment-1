import "./ControlBar.css";
import { useState } from "react";

const ControlBar = ({ setSearchKey, startStdAdd }) => {
  const [content, setContent] = useState("");

  const handleSearchList = (e) => {
    setContent(e.target.value);
    setSearchKey(e.target.value);
  };

  return (
    <div className="controlBar">
      <input
        className="search"
        placeholder="검색"
        value={content}
        onChange={(e) => {
          handleSearchList(e);
        }}
      />
      <button className="addButton" onClick={startStdAdd}>
        추가
      </button>
    </div>
  );
};

export default ControlBar;
