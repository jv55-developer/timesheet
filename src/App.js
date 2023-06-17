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
  const [description, setDescription] = useState("");
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
      <div className="col-md-3 col-10 timesheet-container py-5 px-2 my-2">
        <h1 className="mx-auto text-white">TimeSheets</h1>
        <img src={logo} className="logo mx-auto" alt="logo" />
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
            <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="form-control input-field" />
          </div>
        </form>
        <Stopwatch company={company} department={department} description={description} />
      </div>
    </div>
  );
}

export default App;
