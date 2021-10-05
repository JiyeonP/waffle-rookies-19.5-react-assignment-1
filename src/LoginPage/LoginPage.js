import "./LoginPage.css";
import { useStudentContext } from "../Context/StudentContext";
import axios from "axios";
import API from "../API";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { useLocalStorage, setUseLocalStorage, setLoading } = useStudentContext();

  const Login = () => {
    setLoading(true);
    API.post("/auth/login", {
      username: userId,
      password: userPassword,
    })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        API.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        localStorage.setItem("isLogin", "yes");
        setUseLocalStorage(!useLocalStorage);
      })
      .catch((error) => {
        toast.error("로그인 정보가 틀렸습니다!");
      });
    setLoading(false);
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
          />
          <p className="loginText">Password</p>
          <p className="forgotPassword">Forgot password?</p>
          <input
            className="loginInput"
            value={userPassword}
            onChange={(e) => {
              handlePassword(e);
            }}
          />
          <button className="loginButton" onClick={Login}>
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
