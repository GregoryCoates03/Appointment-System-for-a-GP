import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from './databaseInteraction';


class Navbar extends React.Component {

    render = () => {
        return (
            <nav className="flex justify-center bg-sky-600 space-x-10 text-white">
                <Link to={'/'} className="no-underline">PATIENT</Link>
                <Link to={'/prescriptions/'} className="no-underline">PRESCRIPTIONS</Link>
                <Link to={'/appointments/'} className="no-underline">APPOINTMENTS</Link>
                <Link to={'/information/'} className="no-underline">INFORMATION</Link>
                <Link to={this.props.signedIn ? '/log-out/' : '/sign-in/'} className="no-underline">{this.props.signedIn ? 'LOG OUT' : 'SIGN IN'}</Link>
            </nav>
        )
    }
}

export default Navbar;