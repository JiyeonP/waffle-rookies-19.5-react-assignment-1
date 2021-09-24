import "./App.css";
import { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";

function App() {
  const [logined, setLogined] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        {logined ? (
          <div>
            <Route path="/students" component={MainPage} exact={true} />
            <Route path="/student/:id" component={DetailPage} exact={true} />
            <Redirect to={"/students"} />
          </div>
        ) : (
          <Redirect to={"/login"} />
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
