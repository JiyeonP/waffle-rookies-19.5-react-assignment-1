import "./LoginPage.css";
import { useStudentContext } from "../Context/StudentContext";
import { Link, useHistory } from "react-router-dom";

const LoginPage = ({ handleLogin }) => {
  const {
    studentList,
    setStudentList,
    selectedStudent,
    setSelectedStudent,
    login,
    setLogin,
  } = useStudentContext();

  const history = useHistory();

  return (
    <div className="loginWrapper">
      <div className="loginPage">
        <p className="loginTitle">Sign in to</p>
        <div className="loginBox">
          <p className="loginText">Username or email address</p>
          <input className="loginInput" />
          <p className="loginText">Password</p>
          <p className="forgotPassword">Forgot password?</p>
          <input className="loginInput" />
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
