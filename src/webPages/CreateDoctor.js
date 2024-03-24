import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateDoctor = (props) => {
    const { admin } = props;
     
    const [state, setState] = useState({
        first_name: "",
        last_name: "",
        email: "",
        location_id: 1,
        start_time: "",
        end_time: "",
        break_time: ""
    });

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);


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
        const { first_name, last_name, email, location_id, start_time, end_time, break_time } = state;

        axios.post(`http://localhost:3001/api/doctors`, {first_name, last_name, location_id, start_time, end_time, break_time}).then((response) => {
            console.log(response.data);
            axios.put(`http://localhost:3001/api/upgrade`, { doctor_id: response.data[0].doctor_id, email }).catch((error) => {
                console.log(error);
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Create Doctor</h1>
                <h2 className="text-red-500">Doctor should have a user account before being upgraded to a doctor account</h2>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label htmlFor="first_name">First Name:</label>
                    <input id="first_name" name="first_name" type="text" className="bg-gray-400" value={state.first_name} onChange={handleChange} />
                    <label htmlFor="last_name">Last Name:</label>
                    <input id="last_name" name="last_name" type="text" className="bg-gray-400" value={state.last_name} onChange={handleChange}/>
                    <label htmlFor="email" className="text-red-500">User Account Email:</label>
                    <input id="email" name="email" type="text" className="bg-gray-400" value={state.email} onChange={handleChange} />
                    <label id="location">Location:</label>
                    <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="start_time">Start Time (HH:MM:SS):</label>
                    <input id="start_time" name="start_time" type="text" className="bg-gray-400" value={state.start_time} onChange={handleChange} />
                    <label htmlFor="end_time">End Time (HH:MM:SS):</label>
                    <input id="end_time" name="end_time" type="text" className="bg-gray-400" value={state.end_time} onChange={handleChange} />
                    <label htmlFor="break_time">Break Time (HH:MM:SS):</label>
                    <input id="break_time" name="break_time" type="text" className="bg-gray-400" value={state.break_time} onChange={handleChange} />
                    <button type="submit" className="text-lime-500">Create Doctor</button>
                </form>
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

export default CreateDoctor;