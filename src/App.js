import Home from "./webPages/Home";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Prescriptions from "./webPages/Prescriptions";
import Appointments from "./webPages/Appointments";
import Information from "./webPages/Information";
import SignIn from "./webPages/SignIn";
import CreateAccount from "./webPages/CreateAccount";
import Time from "./webPages/Time";
import Admin from "./webPages/Admin";
import React, { useState } from "react";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    preferred_doctors: ""
  });

  return (
    <BrowserRouter>
      <Navbar admin={admin} signedIn={signedIn} />
      <Routes>
        <Route exact path="/" element={<Home admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/prescriptions/" element={<Prescriptions admin={admin} signedIn={signedIn} />} />
        <Route exact path="/appointments/" element={<Appointments admin={admin} signedIn={signedIn} user={user} />} />
        <Route exact path="/appointments/:date" element={<Time admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/information/" element={<Information signedIn={signedIn} />} />
        <Route exact path="/sign-in/" element={<SignIn setAdmin={setAdmin} setSignedIn={setSignedIn} setUser={setUser} />} />
        <Route exact path="/create-account/" element={<CreateAccount />} />
        <Route exact path="/admin/" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
