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
import Doctor from "./webPages/Doctor";
import Dates from "./webPages/Date";
import React, { useState } from "react";
import CreateDoctor from "./webPages/CreateDoctor";
import UpdateLocation from "./webPages/UpdateLocation";
import UpdateDoctor from "./webPages/UpdateDoctor";
import CreateLocation from "./webPages/CreateLocation";
import DoctorAppointments from "./webPages/DoctorAppointments";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    preferred_doctors: ""
  });

  return (
    <BrowserRouter>
      <Navbar admin={admin} signedIn={signedIn} user={user} />
      <Routes>
        <Route exact path="/" element={<Home admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/prescriptions/" element={<Prescriptions admin={admin} signedIn={signedIn} />} />
        <Route exact path="/appointments/" element={<Appointments admin={admin} signedIn={signedIn} user={user} />} />
        <Route exact path="/appointments/:location/" element={<Doctor admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/appointments/:location/:doctor/" element={<Dates admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/appointments/:location/:doctor/:date" element={<Time admin={admin} signedIn={signedIn}/>} />
        <Route exact path="/information/" element={<Information signedIn={signedIn} />} />
        <Route exact path="/sign-in/" element={<SignIn setAdmin={setAdmin} setSignedIn={setSignedIn} setUser={setUser} />} />
        <Route exact path="/create-account/" element={<CreateAccount />} />
        <Route exact path="/admin/" element={<Admin />} />
        <Route exact path="/admin/create-doctor/" element={<CreateDoctor />} />
        <Route exact path="/admin/update-doctor/" element={<UpdateDoctor />} />
        <Route exact path="/admin/doctor-appointments" element={<DoctorAppointments />} />
        <Route exact path="/admin/create-location/" element={<CreateLocation />} />
        <Route exact path="/admin/update-location/" element={<UpdateLocation />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
