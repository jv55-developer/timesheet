import { useState } from "react";
import Stopwatch from "./Stopwatch";
import logo from "./assets/logo.png";
import "./App.scss";
import {
  companies,
  benefits,
  consulting,
  capital,
  holdings,
} from "./data/data.js";
import Select from "react-select";

function App() {
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleCompany = (vale) => {
    switch (vale) {
      case "NMG BENEFITS":
        setDepartments(benefits);
        break;
      case "NMG CONSULTING":
        setDepartments(consulting);
        break;
      case "NMG CAPITAL":
        setDepartments(capital);
        break;
      case "NMG HOLDINGS":
        setDepartments(holdings);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <h1>TimeSheets</h1>
      <img src={logo} className="logo" alt="logo" />
      <form>
        <div className="mb-3">
          <label className="form-label">Company</label>
          <Select
            options={companies}
            onChange={(e) => {
              handleCompany(e.value);
              setCompany(e.value);
            }}
            className="input-field"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <Select
            options={departments}
            onChange={(e) => setDepartment(e.value)}
            className="input-field"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input type="text" className="form-control input-field" />
        </div>
      </form>
      <Stopwatch />
    </div>
  );
}

export default App;
