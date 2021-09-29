import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [studentList, setStudentList] = useState([
    {
      id: 1,
      name: "박지연",
      grade: 2,
      profileImg:
        "https://pbs.twimg.com/profile_images/378800000469134853/ab84f11033dba217fc5fb297fbe82435.jpeg",
      email: "q0o0p@waffle.hs.kr",
      phone: "010-1234-7890",
      major: "frontend",
      locked: true,
    },
  ]);

  const [selectedStudent, setSelectedStudent] = useState({
    id: false,
    name: false,
    grade: false,
    profileImg: false,
  });

  const [login, setLogin] = useState(false);

  const handleLogin = (v) => {
    setLogin(v);
  };

  return (
    <StudentContext.Provider
      value={{
        studentList,
        setStudentList,
        selectedStudent,
        setSelectedStudent,
        login,
        handleLogin,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
