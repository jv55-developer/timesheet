import React, { useState, useEffect } from "react";
import "./Stopwatch.css";
import axios from 'axios';

const Stopwatch = ({ company, department, description }) => {
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
  const hours = Math.floor(time / 60 / 60 % 24);

  // Minutes calculation
  const minutes = Math.floor(time / 60 % 60);

  // Seconds calculation
  const seconds = Math.floor(time % 60);

  let total_time = hours + (1/(60/minutes)) + (1/(3600/seconds))

  // Method to start and stop timer
  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);

    total_time = total_time.toFixed(2);

    const timesheetData = {
      company,
      department,
      description,
      time: total_time
    }

    axios.post('http://localhost:3004/timesheet', timesheetData)
      .then((res) => {
        console.log(res.data)
      });
  };
  return (
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
  );
};

export default Stopwatch;
