import { createContext, useContext, useState } from "react";

const StudentContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [useLocalStorage, setUseLocalStorage] = useState(false);
  const [loading, setLoading] = useState(false);

  const [selectedStudentId, setSelectedStudent] = useState(false);

  return (
    <StudentContext.Provider
      value={{
        selectedStudentId,
        setSelectedStudent,
        useLocalStorage,
        setUseLocalStorage,
        loading,
        setLoading,
      }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => useContext(StudentContext);
