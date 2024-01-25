import React from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from './databaseInteraction';


const Navbar = () => {
    const a = isAuthenticated();
    return (
        <nav className="flex justify-center bg-sky-600 space-x-10 text-white">
            <Link to={'/'} className="no-underline">PATIENT</Link>
            <Link to={'/prescriptions/'} className="no-underline">PRESCRIPTIONS</Link>
            <Link to={'/appointments/'} className="no-underline">APPOINTMENTS</Link>
            <Link to={'/information/'} className="no-underline">INFORMATION</Link>
            <Link to={'/sign-in/'} className="no-underline">{a ? 'SIGN-IN' : 'Log Out'}</Link>
        </nav>
    )
}

export default Navbar;