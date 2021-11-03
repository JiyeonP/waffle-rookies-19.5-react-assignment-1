import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";
import LoginPage from "./LoginPage/LoginPage";
import { useEffect, useState } from "react";
import { useAuthContext } from "./Context/AuthContext";
import API from "./API";
import { PuffLoader } from "react-spinners";
import { css } from "@emotion/react";
import { toast } from "react-toastify";
const mainLoaderCss = css`
  position: absolute;
  top: 250px;
  left: calc(50% - 75px);
`;

function App() {
  const [loading, setLoading] = useState(true);
  const { login, setLogin } = useAuthContext();

  useEffect(() => {
    if (localStorage.getItem("token") !== "none") {
      API.get("/auth/check_token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          API.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          setLogin(true);
        })
        .catch((error) => {
          console.log(error.response.status);
          if (error.response.status === 401) {
            toast.error("토큰이 만료되었습니다.");
            localStorage.setItem("token", "none");
          } else {
            toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
          }
          API.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${localStorage.getItem("token")}`;
          setLogin(true);
          setLogin(false);
        });
    } else {
      setLogin(false);
    }
    setLoading(false);
  }, []);

  if (login === undefined) {
    return (
      <PuffLoader
        color="#88dd88"
        loading={loading}
        css={mainLoaderCss}
        size={150}
        speedMultiplier={2}
      />
    );
  } else {
    return (
      <>
        {loading ? (
          <PuffLoader
            color="#88dd88"
            loading={loading}
            css={mainLoaderCss}
            size={150}
            speedMultiplier={2}
          />
        ) : (
          <BrowserRouter>
            {login ? (
              <Switch>
                <Route path="/students" component={MainPage} exact={true} />
                <Route path="/student/:id" component={DetailPage} />
                <Redirect to="/students" />
              </Switch>
            ) : (
              <Switch>
                <Route path="/login" component={LoginPage} exact={true} />
                <Redirect to={"/login"} />
              </Switch>
            )}
          </BrowserRouter>
        )}
      </>
    );
  }
}

export default App;
