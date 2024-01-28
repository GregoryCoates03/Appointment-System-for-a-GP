import Home from "./webPages/Home";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Prescriptions from "./webPages/Prescriptions";
import Appointments from "./webPages/Appointments";
import Information from "./webPages/Information";
import SignIn from "./webPages/SignIn";
import CreateAccount from "./webPages/CreateAccount";
import LogOut from "./webPages/LogOut";
import Time from "./webPages/Time";
import React, { useState } from "react";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <BrowserRouter>
      <Navbar signedIn={signedIn} />
      <Routes>
        <Route exact path="/" element={<Home signedIn={signedIn}/>} />
        <Route exact path="/prescriptions/" element={<Prescriptions signedIn={signedIn} />} />
        <Route exact path="/appointments/" element={<Appointments signedIn={signedIn}/>} />
        <Route exact path="/appointments/:date" element={<Time signedIn={signedIn}/>} />
        <Route exact path="/information/" element={<Information signedIn={signedIn} />} />
        <Route exact path="/sign-in/" element={<SignIn setSignedIn={setSignedIn}/>} />
        <Route exact path="/create-account/" element={<CreateAccount />} />
        <Route exact path="/log-out/" element={<LogOut setSignedIn={setSignedIn} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
