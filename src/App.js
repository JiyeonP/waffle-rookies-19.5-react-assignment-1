import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";
import { useStudentContext } from "./Context/StudentContext";
import LoginPage from "./LoginPage/LoginPage";
import { useState } from "react";

function App() {
  const { studentList, setStudentList, selectedStudent, setSelectedStudent } =
    useStudentContext;

  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <BrowserRouter>
      <Switch>
        {login ? (
          <div>
            <Route path="/students" component={MainPage} exact={true} />
            <Route path="/student/:id" component={DetailPage} exact={true} />
            <Redirect to={"/students"} />
          </div>
        ) : (
          <div>
            <Route
              path="/login"
              render={() => <LoginPage handleLogin={handleLogin} />}
              exact={true}
            />
            <Redirect to={"/login"} />
          </div>
        )}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
