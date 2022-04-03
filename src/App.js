import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddData from "./components/AddData";
import Data from "./components/Data";
import DataList from "./components/DataList";
function App() {
  return (
    <Router>
      <div className="container-fluid bg-dark">
        <div className="container">
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/data" className="navbar-brand">
              Redux Demo
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/data"} className="nav-link">
                  Datas
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add New
                </Link>
              </li>
            </div>
          </nav>

        </div>
      </div>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/data"]} component={DataList} />
          <Route exact path="/add" component={AddData} />
          <Route path="/data/:id" component={Data} />
        </Switch>
      </div>
    </Router>
  );
}
export default App;