import React, { useState } from "react";
import axios from "axios";

const CreateLocation = (props) => {
    const { admin } = props;

    const [state, setState] = useState({
        location_name: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((state) => ({...state, [name]: value}));
        console.log(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { location_name } = state;
        const error = document.getElementById('error');

        axios.post(`http://localhost:3001/api/locations`, {location_name}).then((response) => {
            console.log(response.status);
            if (response.status === 200){
                error.textContent = "Location created";
                error.className = "text-green-500";
            } else {
                error.textContent = "Error";
                error.className = "text-red-500";
            }
        }).catch((error) => {
            console.log(error);
            error.textContent = "Error";
            error.className = "text-red-500";
        });
    }

    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Create Location</h1>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="location_name">Location Name:</label>
                    <input id="location_name" name="location_name" type="text" className="bg-gray-400" value={state.location_name} onChange={handleChange} />
                    <button type="submit" className="text-lime-500">Create Location</button>
                </form>
                <p id="error" className="text-red-500"></p>
            </div>
        )  
    } else {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-red-500">ACCESS DENIED</h1>
            </div>
        )
    }
}

export default CreateLocation;