import Home from "./webPages/Home";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './Calendar.css';
import Prescriptions from "./webPages/Prescriptions";
import Appointments from "./webPages/Appointments";
import UpcomingAndPast from "./webPages/UpcomingAndPast";
import Information from "./webPages/Information";
import SignIn from "./webPages/SignIn";
import CreateAccount from "./webPages/CreateAccount";
import Time from "./webPages/Time";
import Admin from "./webPages/Admin";
import Doctor from "./webPages/Doctor";
import Dates from "./webPages/Date";
import Confirm from "./webPages/Confirm";
import React, { useState } from "react";
import CreateDoctor from "./webPages/CreateDoctor";
import UpdateLocation from "./webPages/UpdateLocation";
import UpdateDoctor from "./webPages/UpdateDoctor";
import CreateLocation from "./webPages/CreateLocation";
import DoctorAppointments from "./webPages/DoctorAppointments";
import DoctorHome from "./webPages/DoctorHome";

const App = () => {
  const [signedIn, setSignedIn] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({
    first_name: "",
    location_id: null
  });
  const [doctor, setDoctor] = useState(false);

  document.body.className = "bg-sky-200 font-mono";

  //<Route exact path="/prescriptions/" element={<Prescriptions admin={admin} signedIn={signedIn} />} />
  
  return (
    <BrowserRouter>
          <Navbar admin={admin} setSignedIn={setSignedIn} setAdmin={setAdmin} signedIn={signedIn} user={user} doctor={doctor} setDoctor={setDoctor} />
          <Routes>
            <Route exact path="/" element={<Home admin={admin} signedIn={signedIn}/>} />
            <Route exact path="/appointments/" element={<Appointments admin={admin} signedIn={signedIn} user={user} />} />
            <Route exact path="/appointments/upcoming-and-past/" element={<UpcomingAndPast admin={admin} signedIn={signedIn} />} />
            <Route exact path="/appointments/:location/" element={<Doctor admin={admin} signedIn={signedIn} />} />
            <Route exact path="/appointments/:location/:doctor/" element={<Dates admin={admin} signedIn={signedIn}/>} />
            <Route exact path="/appointments/:location/:doctor/:date" element={<Time admin={admin} signedIn={signedIn}/>} />
            <Route exact path="/appointments/:location/:doctor/:date/:time" element={<Confirm admin={admin} signedIn={signedIn}/>} />
            <Route exact path="/information/" element={<Information signedIn={signedIn} />} />
            <Route exact path="/sign-in/" element={<SignIn setAdmin={setAdmin} setSignedIn={setSignedIn} setUser={setUser} setDoctor={setDoctor} />} />
            <Route exact path="/create-account/" element={<CreateAccount />} />
            <Route exact path="/admin/" element={<Admin admin={admin} user={user} />} />
            <Route exact path="/admin/create-doctor/" element={<CreateDoctor admin={admin} />} />
            <Route exact path="/admin/update-doctor/" element={<UpdateDoctor admin={admin} />} />
            <Route exact path="/admin/doctor-appointments" element={<DoctorAppointments admin={admin} />} />
            <Route exact path="/admin/create-location/" element={<CreateLocation admin={admin} />} />
            <Route exact path="/admin/update-location/" element={<UpdateLocation admin={admin} />} />
            <Route exact path="/doctor/" element={<DoctorHome doctor={doctor} user={user} />} />
          </Routes>
    </BrowserRouter>
  )
}

export default App;
