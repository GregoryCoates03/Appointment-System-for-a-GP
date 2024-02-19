import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateDoctor = () => {
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        location_id: null
    });

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);

    const getLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/locations`);
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
        const { first_name, last_name, location_id } = state;

        axios.post(`http://localhost:3001/api/doctors`, {first_name, last_name, location_id}).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="flex flex-col items-center">
            <h1>Create Doctor</h1>
            <form className="flex flex-col" onSubmit={handleSubmit}>
                <label htmlFor="first_name">First Name:</label>
                <input id="first_name" name="first_name" type="text" className="bg-gray-400" value={state.first_name} onChange={handleChange} />
                <label htmlFor="last_name">Last Name:</label>
                <input id="last_name" name="last_name" type="text" className="bg-gray-400" value={state.last_name} onChange={handleChange}/>
                <label id="location">Location:</label>
                <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                    {locations.map((location) => (
                        <option key={location.location_id} value={location.location_id}>
                            {location.location_name}
                        </option>
                    ))}
                </select>
                <button type="submit" className="text-lime-500">Create Doctor</button>
            </form>
        </div>
    )
}

export default CreateDoctor;