import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({
    id: false,
    name: false,
    grade: false,
    profileImg: false,
  });

  return (
    <StudentContext.Provider
      value={{
        studentList,
        setStudentList,
        selectedStudent,
        setSelectedStudent,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
