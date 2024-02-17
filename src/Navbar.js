import React from 'react';
import { Link } from 'react-router-dom';
import { logOutUser } from './databaseInteraction';


const Navbar = (props) => {
    const { signedIn, admin, setSignedIn, setAdmin, user } = props;

    const handleClick = () => {
        logOutUser();
        setSignedIn(false);
        setAdmin(false);
    }

    return (
        <nav className="flex justify-center bg-sky-600 space-x-10 text-white">
            <Link to={admin ? '/admin/' : '/'} className="no-underline">{admin ? 'ADMIN' : 'PATIENT'}</Link>
            <Link to={'/prescriptions/'} className="no-underline">PRESCRIPTIONS</Link>
            <Link to={user ? '/appointments/' : `/appointments/${user.preferred_doctors}/`} className="no-underline">APPOINTMENTS</Link>
            <Link to={'/information/'} className="no-underline">INFORMATION</Link>
            {signedIn ? <button onClick={handleClick}>LOG OUT</button> : <Link to='/sign-in/' className="no-underline">SIGN IN</Link>}
        </nav>
    )
}

export default Navbar;