import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../databaseInteraction";
import axios from "axios";

const CreateAccount = (props) => {
    const [state, setState] = useState({
        first_name: "",
        family_name: "",
        email: "",
        confirm_email: "",
        phone_number: "",
        address: "",
        password: "",
        confirm_password: "",
        location_id: 1
    });

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);

    const getLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations`);
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((state) => ({...state, [name]: value}));
        console.log(name, value);
    }

    const handleLocationChange = (event) => {
        console.log(event.target.value);
        setSelectedLocation(event.target.value);
        setState((state) => ({...state, location_id: event.target.value}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const { first_name, family_name, email, confirm_email, phone_number, address, password, confirm_password, location_id } = state;
        let email_same = false;
        let password_same = false;
        const error = document.getElementById('error');

        if (email === confirm_email) {
            email_same = true;
        } else {
            error.textContent = "Emails not matching";
        }

        if (password === confirm_password){
            password_same = true;
        } else {
            error.textContent = "Passwords not matching";
        }

        if (email_same && password_same){
            createAccount({ first_name, family_name, email, phone_number, address, password, location_id }).then((response) => {
                if (response === true){
                    error.textContent = "Email already exists";
                } else {
                    error.textContent = "Account created";
                    error.className = "text-green-500";
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <div className="flex items-center flex-col border-2"> 
            <Link to={'/sign-in/'} className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5">Sign-In</Link>
            <h1 className="underline">Create Account</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input id="first_name" name="first_name" type="text" className="bg-gray-400" value={state.first_name} onChange={handleChange} />
                <label htmlFor="family_name">Family Name:</label>
                <input id="family_name" name="family_name" type="text" className="bg-gray-400" value={state.family_name} onChange={handleChange} />
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" className="bg-gray-400" value={state.email} onChange={handleChange} />
                <label htmlFor="confirm_email">Confirm Email:</label>
                <input id="confirm_email" name="confirm_email" type="email" className="bg-gray-400" value={state.confirm_email} onChange={handleChange} />
                <label htmlFor="phone_number">Phone Number e.g. 123-456-789:</label>
                <input id="phone_number" name="phone_number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" className="bg-gray-400" value={state.phone_number} onChange={handleChange}/>
                <label htmlFor="address">Address:</label>
                <input id="address" name="address" type="text" className="bg-gray-400" value={state.address} onChange={handleChange}/>
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" className="bg-gray-400" value={state.password} onChange={handleChange}/>
                <label htmlFor="confirm_password">Confirm Password:</label>
                <input id="confirm_password" name="confirm_password" type="password" className="bg-gray-400" value={state.confirm_password} onChange={handleChange}/>
                <label htmlFor="location_id">Preferred Doctors:</label>
                <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                    {locations.map((location) => (
                        <option key={location.location_id} value={location.location_id}>
                            {location.location_name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="text-lime-500">Create Account</button>
            </form>
            <p id="error" className="text-red-500"></p>
        </div>
    )
}

export default CreateAccount;