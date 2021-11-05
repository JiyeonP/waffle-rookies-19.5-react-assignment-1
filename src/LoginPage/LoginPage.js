import "./LoginPage.css";
import { useAuthContext } from "../Context/AuthContext";
import API from "../API";
import { useState } from "react";
import { toast } from "react-toastify";
import {useCookies} from "react-cookie";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { setLogin } = useAuthContext();

  const handleLogin = () => {
    API.post("/auth/login", {
      username: userId,
      password: userPassword,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
        setLogin(true);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("로그인 정보가 틀렸습니다.");
        } else {
          toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
        }
      });
  };

  const handleId = (e) => {
    setUserId(e.target.value);
  };

  const handlePassword = (e) => {
    setUserPassword(e.target.value);
  };

  return (
    <div className="loginWrapper">
      <div className="loginPage">
        <p className="loginTitle">Sign in to</p>
        <div className="loginBox">
          <p className="loginText">Username or email address</p>
          <input
            className="loginInput"
            value={userId}
            onChange={(e) => handleId(e)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <p className="loginText">Password</p>
          <p className="forgotPassword">Forgot password?</p>
          <input
            className="loginInput"
            value={userPassword}
            onChange={(e) => {
              handlePassword(e);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />
          <button className="loginButton" onClick={handleLogin}>
            <p className="loginButtonText">Sign in</p>
          </button>
        </div>
        <div className="createAccountBox">
          <p className="createAccountText">New to</p>
          <p className="createAccount">Create an account.</p>
        </div>
        <div className="etcBox">
          <p className="etcText">Terms</p>
          <p className="etcText">Privacy</p>
          <p className="etcText">Security</p>
          <p className="etcText">Contact</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
