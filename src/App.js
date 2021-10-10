import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";
import LoginPage from "./LoginPage/LoginPage";
import {useEffect, useState} from "react";
import { useAuthContext } from "./Context/AuthContext";
import API from "./API";
import {PuffLoader} from "react-spinners";
import {css} from "@emotion/react";

function App() {
  const [loading, setLoading] = useState(true);
  const { login, setLogin } = useAuthContext();
  const mainLoaderCss = css`position: absolute; top: 250px; left: calc(50% - 75px)`;

  useEffect(() => {
    if (localStorage.getItem("isLogin") === "yes") {
      setLogin(true);
    } else {
      setLogin(false);
    }

    API.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("token")}`;
  }, [login]);

  if (login === undefined){
    return (
          <PuffLoader color="#88dd88" loading={loading} css={mainLoaderCss} size={150} speedMultiplier={2}/>
    )
  } else {
    return (
        <BrowserRouter>
          {login === true ? (
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
    );
  }
}

export default App;
