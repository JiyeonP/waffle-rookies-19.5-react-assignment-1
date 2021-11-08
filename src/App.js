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
import {useCookies} from "react-cookie";
const mainLoaderCss = css`
  position: absolute;
  top: 250px;
  left: calc(50% - 75px);
`;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["tokenAvailable"]);
  const [loading, setLoading] = useState(true);
  const { login, setLogin } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("token") !== "none") {
      API.get("/auth/check_token", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setLogin(true);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            if (login === true){
              toast.error("토큰이 만료되었습니다.");
            }
            localStorage.setItem("token", "none");
          } else {
            toast.error("오류가 발생하였습니다. 서버에 문의하십시오.");
          }
          setLogin(false);
          setLoading(false);
        });
    } else {
      setLogin(false);
      setLoading(false);
    }
    API.defaults.headers.common[
        "Authorization"
        ] = `Bearer ${localStorage.getItem("token")}`;
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
