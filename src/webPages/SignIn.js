import React from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div className="flex items-center flex-col border-2"> 
            <Link to={'/create-account/'}>Create Account</Link>
            <h1>Sign-In</h1>
            <form className="flex flex-col">
                <label for="email">Email:</label>
                <input type="email" className="bg-gray-400"/>
                <label for="password" className="">Password:</label>
                <input type="password" className="bg-gray-400"/>
                <button type="submit" className="text-lime-500">Sign-In</button>
            </form>
        </div>
    )
}

export default SignIn;