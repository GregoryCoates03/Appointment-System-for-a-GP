import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateAccount } from "../databaseInteraction";
import axios from "axios";

const Information = (props) => {
    const { signedIn } = props;
    const navigate = useNavigate()
    const loc = useLocation();

    const [state, setState] = useState({
        user_id: "",
        first_name: "",
        family_name: "",
        email: "",
        new_email: "",
        phone_number: "",
        new_phone_number: "",
        address: "",
        new_address: "",
        password: "",
        confirm_password: "",
        location_id: 1
    });

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/signed-in`);
            if (response.data.isAuthenticated) {
                const { user_id, first_name, family_name, email, phone_number, address, location_id } = response.data.user;
                setState({...state, user_id, first_name, family_name, email, phone_number, address, location_id });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/locations`);
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!signedIn) {
            navigate('/sign-in', { state: { prev: loc.pathname }});
        }
        getLocations();
        getUser();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((state) => ({...state, [name]: value}));
        console.log(name, value);
        console.log(state)
    }

    const handleLocationChange = (event) => {
        //console.log(event.target.value);
        setSelectedLocation(event.target.value);
        setState((state) => ({...state, location_id: event.target.value}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        let { user_id, email, new_email, new_phone_number, phone_number, address, new_address, password, confirm_password, location_id } = state;
        let password_same = false;
        const error = document.getElementById('error');

        if (password === confirm_password){
            password_same = true;
        } else {
            error.textContent = "Passwords not matching";
        }

        if (new_address !== ""){
            address = new_address;
        }

        if (new_phone_number !== ""){
            phone_number = new_phone_number;
        }

        if (new_email !== ""){
            email = new_email;
        }

        if (password_same || password === ""){
            //console.log("Aaaaaaaaaaaaaaaaaaaaa");
            let details = { user_id, email, phone_number, address, password, location_id };
            let properDetails = {};

            for (const item in details) {
                if (details[item] !== ""){
                    properDetails[item] = details[item];
                }
            }

            //console.log(details);
            //console.log(properDetails);

            updateAccount(properDetails).then((response) => {
                //console.log(response);
                if (response){
                    error.textContent = "Email already exists";
                    error.className = "text-red-500";
                } else {
                    error.textContent = "Account updated";
                    error.className = "text-green-500";
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    if (signedIn) {
        return (
            <div className="flex items-center flex-col border-2"> 
                <h1 className="underline">Update Information</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name:</label>
                    <input id="first_name" name="first_name" type="text" className="bg-gray-600 text-white" value={state.first_name} onChange={handleChange} disabled/>
                    <label htmlFor="family_name">Family Name:</label>
                    <input id="family_name" name="family_name" type="text" className="bg-gray-600 text-white" value={state.family_name} onChange={handleChange} disabled/>
                    <label htmlFor="email">Current Email:</label>
                    <input id="email" name="email" type="email" className="bg-gray-600 text-white" value={state.email} onChange={handleChange} disabled/>
                    <label htmlFor="new_email">New Email:</label>
                    <input id="new_email" name="new_email" type="email" className="bg-gray-400" value={state.new_email} onChange={handleChange} />
                    <label htmlFor="phone_number">Current Phone Number e.g. 123-456-789:</label>
                    <input id="phone_number" name="phone_number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" className="bg-gray-600 text-white" value={state.phone_number} onChange={handleChange} disabled/>
                    <label htmlFor="new_phone_number">New Phone Number e.g. 123-456-789:</label>
                    <input id="new_phone_number" name="new_phone_number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" className="bg-gray-400" value={state.new_phone_number} onChange={handleChange} />
                    <label htmlFor="address">Current Address:</label>
                    <input id="address" name="address" type="text" className="bg-gray-600 text-white" value={state.address} onChange={handleChange} disabled/>
                    <label htmlFor="new_address">New Address:</label>
                    <input id="new_address" name="new_address" type="text" className="bg-gray-400" value={state.new_address} onChange={handleChange}/>
                    <label htmlFor="password">New Password:</label>
                    <input id="password" name="password" type="password" className="bg-gray-400" value={state.password} onChange={handleChange}/>
                    <label htmlFor="confirm_password">Confirm New Password:</label>
                    <input id="confirm_password" name="confirm_password" type="password" className="bg-gray-400" value={state.confirm_password} onChange={handleChange}/>
                    <label htmlFor="location_id">Preferred Doctors:</label>
                    <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="text-lime-500">Update Account</button>
                </form>
                <p id="error" className="text-red-500"></p>
            </div>
        )
    }
}

export default Information;