import React, { useState } from "react";
import axios from "axios";

const CreateLocation = () => {
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

        axios.post(`http://localhost:3001/api/locations`, {location_name}).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Create Location</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="location_name">Location Name:</label>
                <input id="location_name" name="location_name" type="text" className="bg-gray-400" value={state.location_name} onChange={handleChange} />
                <button type="submit" className="text-lime-500">Create Location</button>
            </form>
        </div>
    )
}

export default CreateLocation;