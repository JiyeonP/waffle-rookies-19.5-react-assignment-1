import "./ControlBar.css";

const ControlBar = ({ setSearchKey, searchKey, handleAddStudent }) => {
  return (
    <div className="controlBar">
      <input
        className="search"
        placeholder="검색"
        value={searchKey}
        onChange={(e) => {
          setSearchKey(e.target.value);
        }}
      />
      <button className="addButton" onClick={handleAddStudent}>
        추가
      </button>
    </div>
  );
};

export default ControlBar;
