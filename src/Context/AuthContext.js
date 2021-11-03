import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [login, setLogin] = useState();

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
