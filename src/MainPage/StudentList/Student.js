import "./Student.css";

const Student = ({ student, selected, selectChange }) => {
  const handleSelectStudent = () => {
    selectChange(student);
  };

  return (
    <li key={student.id} className={`student ${selected ? "selected" : ""}`}>
      <p className="listComp">{student.name}</p>
      <p className="listComp">{student.grade}</p>
      <button
        className={`viewProfileButton ${selected ? "selected" : ""}`}
        onClick={handleSelectStudent}
      >
        <img
          className="studentListArrow"
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          alt="arrow"
        />
      </button>
      <button
        className={`closeProfileButton ${selected ? "selected" : ""}`}
        onClick={handleSelectStudent}
      >
        <img
          className="studentListArrow2"
          src="https://cdn-icons-png.flaticon.com/512/271/271226.png"
          alt="back arrow"
        />
      </button>
    </li>
  );
};

export default Student;
