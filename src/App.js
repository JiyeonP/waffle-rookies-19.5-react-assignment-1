import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";
import LoginPage from "./LoginPage/LoginPage";
import { useEffect } from "react";
import { useAuthContext } from "./Context/AuthContext";
import API from "./API";

function App() {
  const { login, setLogin } = useAuthContext();

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
        <div>

        </div>
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
