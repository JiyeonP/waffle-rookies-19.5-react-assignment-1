import { createContext, useContext, useState } from "react";
import API from "../API";
import { toast } from "react-toastify";

const AuthContext = createContext(null);

export const ContextProvider = ({ children }) => {
  const [login, setLogin] = useState(false);

  return (
    <AuthContext.Provider
      value={{
          login, setLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
