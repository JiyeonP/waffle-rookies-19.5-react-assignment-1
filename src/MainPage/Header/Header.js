import "./Header.css";
import { useAuthContext } from "../../Context/AuthContext";
import styled from "styled-components";

const WaffleHeader = styled.div`
    position: relative;
    height: 30px;
    left: 20px;
    top: 30px;
    display: flex;
  `;

const WaffleLogo = styled.img`
    position: absolute;
    width: 54px;
    height: 58px;
    left: 4px;
  `;

const Title = styled.p`
    position: absolute;
    width: 380px;
    height: 31px;
    left: 80px;
    top: 16px;
    margin: 0px;
    padding: 0px;
  
    font-size: 24px;
    line-height: 31px;
  `;

const LogoutButton = styled.button`
    position: relative;
    width: 70px;
    height: 30px;
    left: 640px;
    top: 15px;
    font-weight: bold;
    color: white;

    background-color: #ef7c6a;
    border-width: 0px;
    border-radius: 5px;
    &:hover {
      background-color: #cd5a48;
    }
  `;

const Header = () => {
  const { setLogin } = useAuthContext();

  const Logout = () => {
    localStorage.setItem("token", "none");
    setLogin(false);
  };

  return (
    <WaffleHeader>
      <a href="https://wafflestudio.com/" target="_blank">
        <WaffleLogo
          src="https://wafflestudio.com/_next/image?url=%2Fimages%2Ficon_intro.svg&w=640&q=75"
          alt="waffle studio logo"
        />
      </a>
      <Title>와플고등학교 명단 관리 프로그램</Title>
      <LogoutButton onClick={Logout}>Logout</LogoutButton>
    </WaffleHeader>
  );
};

export default Header;
