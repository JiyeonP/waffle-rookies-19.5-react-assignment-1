import "./Header.css";
import { useStudentContext } from "../../Context/StudentContext";

const Header = () => {
  const { useLocalStorage, setUseLocalStorage } = useStudentContext();

  const Logout = () => {
    localStorage.setItem("isLogin", "no");
    setUseLocalStorage(!useLocalStorage);
  };

  return (
    <div className="header">
      <a href="https://wafflestudio.com/" target="_blank">
        <img
          className="waffleLogo"
          src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=640&q=75"
          alt="waffle studio logo"
        />
      </a>
      <p className="title">와플고등학교 명단 관리 프로그램</p>
      <button className="logoutButton" onClick={Logout}>
        Logout
      </button>
    </div>
  );
};

export default Header;
