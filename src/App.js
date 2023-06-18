import { useState, useEffect } from "react";
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
import axios from "axios";

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

  // state to store time
  const [time, setTime] = useState(0);

  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // setting time from 0 to 1 every 10 milisecond using javascript setInterval method
      intervalId = setInterval(() => setTime(time + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  // Hours calculation
  const hours = Math.floor((time / 60 / 60) % 24);

  // Minutes calculation
  const minutes = Math.floor((time / 60) % 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  let total_time = hours + 1 / (60 / minutes) + 1 / (3600 / seconds);

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0 and send the data to the local DB
  const reset = () => {
    setTime(0);

    total_time = total_time.toFixed(2);

    const timesheetData = {
      company,
      department,
      description,
      time: total_time,
    };

    axios.post("http://localhost:3004/timesheet", timesheetData).then((res) => {
      console.log(res.data);
      setDescription('');
    });    
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
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control input-field"
            />
          </div>
        </form>
        <div className="stopwatch-container">
          <p className="stopwatch-time">
            {hours}:{minutes.toString().padStart(2, "0")}:
            {seconds.toString().padStart(2, "0")}
          </p>
          <div className="stopwatch-buttons">
            <button className="stopwatch-button" onClick={startAndStop}>
              {isRunning ? "Stop" : "Start"}
            </button>
            <button className="stopwatch-button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
