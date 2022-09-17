import React, { useState } from "react";
import logo from "./assets/img/logo.png";
import "./App.css";
import {MediaComponent, ZoomComponent} from "./components";

function App() {
  const [joinMeeting, setJoinMeeting] = useState(false);
  const [startMeeting, setStartMeeting] = useState(false);

  const [role, setRole] = useState(0); //0 = invited, 1 = organizer
  const [meetingNumber, setMeetingNumber] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState(null);

  const HandleJoinMeeting = () => setJoinMeeting(!joinMeeting);
  const HandleStartMeeting = () => {
    debugger
    setRole(1);
    setStartMeeting(!startMeeting);
  }
  return (
    <div className="App">
      {!joinMeeting && !startMeeting ? (
        <header className="App-header">
          <img src={logo}  alt="logo" />
          {/* <MediaComponent /> */}
          <p>Ingrese los datos requeridos para unirse a la reunión</p>
          <div className="container">
            <input
              className="input-text item"
              type="text"
              placeholder="Meeting Number"
              defaultValue={meetingNumber}
              onChange={(e) => setMeetingNumber(e.target.value)}
            ></input>
            <input
              className="input-text item"
              type="text"
              placeholder="Username"
              defaultValue={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            <input
              className="input-text item"
              type="email"
              placeholder="User Email"
              defaultValue={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            ></input>
            <input
              className="input-text item"
              type="password"
              placeholder="Password Meet"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="container">
            <button className="btn" onClick={HandleJoinMeeting}>
              Join Meeting
            </button>
            <button className="btn" onClick={HandleStartMeeting}>
              Start Meeting
            </button>
          </div>
        </header>
      ) : (
        <ZoomComponent
          role={role}
          meetingNumber={meetingNumber}
          username={username}
          userEmail={userEmail}
          password={password}
        />
      )}
    </div>
  );
}

export default App;
