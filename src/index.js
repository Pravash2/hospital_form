import React from "react";
import ReactDOM from "react-dom";
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import App from "./App";
import Form from "./Editform";
import CreateForm from "./CreateForm";
import "./styles.css";
import BloodGroupTable from "./BloodGroupTable";
import DoctorTable from "./DoctorsTable";
import MedicineTable from "./MedicineTables";
import List from "./List";
import SignIn from "./SignIN";

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={List} />

        <Route path="/create" component={CreateForm} />
        <Route path="/bloodbank/:id" component={BloodGroupTable} />
        <Route path="/medicine/:id" component={MedicineTable} />
        <Route path="/doctor/:id" component={DoctorTable} />
        <Route path="/edit/:id" component={App} />
      </Switch>
    </div>
  </Router>
);

const rootElement = document.getElementById("root");
ReactDOM.render(routing, rootElement);
