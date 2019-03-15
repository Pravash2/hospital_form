import React from "react";
import List from "./List";
import Table2 from "./BloodGroupTable";
import Table from "./DoctorsTable";
import Table3 from "./MedicineTables.js";
import EditForm from "./Editform";
import Appbar from "./TabBar";
export default class App extends React.Component {
  render() {
    return (
      <div>
        <Appbar />
      </div>
    );
  }
}
