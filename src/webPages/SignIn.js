import React, { useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInUser, getUser } from "../databaseInteraction";

const SignIn = (props) => {
    const { setSignedIn, setAdmin, setUser } = props;
    const navigate = useNavigate();

    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((state) => ({...state, [name]: value}));
        console.log(name, value);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = state;

        signInUser(email, password).then((response) => {
            //console.log(response);
            setSignedIn(true);
            getUser().then((response) => {
                //console.log(response.user.admin);
                setUser({
                    first_name: response.user.first_name,
                    preferred_doctors: response.user.preferred_doctors
                })
                if(response.user.admin === true){
                    setAdmin(true);
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex items-center flex-col border-2"> 
            <Link to={'/create-account/'} className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5">Create Account</Link>
            <h1 className="underline">Sign-In</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" className="bg-gray-400" onChange={handleChange}/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" className="bg-gray-400" onChange={handleChange}/>
                <button type="submit" className="text-lime-500">Sign-In</button>
            </form>
        </div>
    )
}

export default SignIn;