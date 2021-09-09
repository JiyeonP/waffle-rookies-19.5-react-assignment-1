import "./StudentList.css";
import Student from "./Student";

const StudentList = ({
  stdList,
  searchKey,
  selectedStd,
  selectStd,
  unselectStd,
}) => {
  const showList = stdList.filter((item) => item.name.includes(searchKey));

  return (
    <div className="listBox">
      <div className="listHeader">
        <p className="headerComp">이름</p>
        <p className="headerComp">학년</p>
      </div>
      <ul className="stdList">
        {showList.map((item) => (
          <Student
            key={item.id}
            student={item}
            selected={selectedStd.id === item.id}
            selectStd={selectStd}
            unselectStd={unselectStd}
          />
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
