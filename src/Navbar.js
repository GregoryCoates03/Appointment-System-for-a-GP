import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logOutUser } from './databaseInteraction';


const Navbar = (props) => {
    const { signedIn, admin, setSignedIn, setAdmin, user, doctor, setDoctor } = props;

    const handleClick = () => {
        logOutUser();
        setSignedIn(false);
        setAdmin(false);
        setDoctor(false);
    }
    
    //<Link to={'/prescriptions/'} className="no-underline">PRESCRIPTIONS</Link>
    return (
        <nav className="flex flex-wrap justify-center bg-sky-600 space-x-10 text-white font-serif">
            <Link to={admin ? '/admin/' : doctor ? '/doctor/' : '/'} className="no-underline">{admin ? 'ADMIN' : doctor ? 'DOCTOR' : 'PATIENT'}</Link>
            <Link to={user ? '/appointments/' : `/appointments/${user.location_id}/`} className="no-underline">APPOINTMENTS</Link>
            <Link to={'/information/'} className="no-underline">INFORMATION</Link>
            {signedIn ? <button onClick={handleClick}>LOG OUT</button> : <Link to='/sign-in/' className="no-underline">SIGN IN</Link>}
        </nav>
    )
}

export default Navbar;