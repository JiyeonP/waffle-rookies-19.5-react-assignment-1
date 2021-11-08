import {
    createContext,
    Dispatch, ReactNode,
    SetStateAction,
    useContext,
    useState,
} from "react";
import { toast } from "react-toastify";
import API from "../API";

const AuthContext = createContext<authContextType | null>(null);

type authContextType = {
  login: boolean;
  setLogin: Dispatch<SetStateAction<boolean>>;
  tokenExpire: () => void;
};

export const ContextProvider = ( {children} : {children: ReactNode} ) => {
  const [login, setLogin] = useState<boolean>(false);
  const tokenExpire = () => {
    localStorage.setItem("token", "none");
    if (API.defaults.headers !== undefined) {
      API.defaults.headers.common[
        // @ts-ignore
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
    }
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

export const useAuthContext = () => useContext(AuthContext) as authContextType;
