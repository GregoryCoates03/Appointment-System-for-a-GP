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

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/prescriptions/" element={<Prescriptions />} />
        <Route exact path="/appointments/" element={<Appointments />} />
        <Route exact path="/information/" element={<Information />} />
        <Route exact path="/sign-in/" element={<SignIn />} />
        <Route exact path="/create-account/" element={<CreateAccount />} />
        <Route exact path="/log-out/" element={<LogOut />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
