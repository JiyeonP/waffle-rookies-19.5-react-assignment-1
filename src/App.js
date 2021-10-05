import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import MainPage from "./MainPage/MainPage";
import DetailPage from "./DetailPage/DetailPage";
import { useStudentContext } from "./Context/StudentContext";
import LoginPage from "./LoginPage/LoginPage";

function App() {
  const { studentList } = useStudentContext();

  return (
    <BrowserRouter>
      {localStorage.getItem("isLogin") === "yes" ? (
        <Switch>
          <Route path="/students" component={MainPage} exact={true} />
          <Route
            path="/student/:id"
            render={(props) => {
              if (
                studentList.find(
                  (item) => item.id.toString() === props.match.params.id
                )
              ) {
                return <DetailPage />;
              }
              return <Redirect to={"/students"} />;
            }}
            exact={true}
          />
          <Redirect to="/students" />
        </Switch>
      ) : (
        <Switch>
          <Route path="/login" render={() => <LoginPage />} exact={true} />
          <Redirect to={"/login"} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default App;
