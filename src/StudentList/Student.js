import "./Student.css";

const Student = ({ student, selected, selectStd, unselectStd }) => {
  const handleSelectStd = () => {
    selectStd(student);
  };

  const handleUnselectStd = () => {
    unselectStd();
  };

  return (
    <li className={`student ${selected ? "selected" : ""}`}>
      <p className="listComp">{student.name}</p>
      <p className="listComp">{student.grade}</p>
      <button
        className={`viewProfileButton ${selected ? "selected" : ""}`}
        onClick={handleSelectStd}
      >
        <img
          className="stdListArrow"
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          alt="arrow"
        />
      </button>
      <button
        className={`closeProfileButton ${selected ? "selected" : ""}`}
        onClick={handleUnselectStd}
      >
        <img
          className="stdListArrow2"
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          alt="back arrow"
        />
      </button>
    </li>
  );
};

export default Student;
