import {
  createContext,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import API from "../API";

const AuthContext = createContext(null);

export const ContextProvider = ({children}) => {
  const [login, setLogin] = useState(false);
  const tokenExpire = () => {
    localStorage.setItem("token", "none");
      API.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    setLogin(false);
    toast.warn("토큰이 만료되었습니다.");
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        setLogin,
        tokenExpire,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
