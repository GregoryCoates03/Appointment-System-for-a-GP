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

    const [workingDays, setWorkingDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
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

    const handleDayChange = (event) => {
        const { name, checked } = event.target;
        setWorkingDays((previousWorkingDays) => ({...previousWorkingDays, [name]: checked}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { first_name, last_name, email, location_id, start_time, end_time, break_time } = state;
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = workingDays;

        const error = document.getElementById('error');
        
        axios.post(`http://localhost:3001/api/doctors`, {first_name, last_name, location_id, start_time, end_time, break_time, monday, tuesday, wednesday, thursday, friday, saturday, sunday}).then((response) => {
            console.log(response.data);
            axios.put(`http://localhost:3001/api/upgrade`, { doctor_id: response.data[0].doctor_id, email }).catch((error) => {
                console.log(error);
            });
            error.textContent = "Doctor created";
            error.className = "text-green-500";
        }).catch((error) => {
            console.log(error);
            error.textContent = "Error";
            error.className = "text-red-500";
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
                    <div className="flex items-center">
                        <div id="working_days" className="flex flex-col items-end">
                            <label htmlFor="monday">Monday: <input id="monday" name="monday" type="checkbox" checked={workingDays.monday} value={workingDays.monday} onChange={handleDayChange}/></label>
                            <label htmlFor="tuesday">Tuesday: <input id="tuesday" name="tuesday" type="checkbox" checked={workingDays.tuesday} value={workingDays.tuesday} onChange={handleDayChange}/></label>
                            <label htmlFor="wednesday">Wednesday: <input id="wednesday" name="wednesday" type="checkbox" checked={workingDays.wednesday} value={workingDays.wednesday} onChange={handleDayChange}/></label>
                            <label htmlFor="thursday">Thursday: <input id="thursday" name="thursday" type="checkbox" checked={workingDays.thursday} value={workingDays.thursday} onChange={handleDayChange}/></label>
                            <label htmlFor="friday">Friday: <input id="friday" name="friday" type="checkbox" checked={workingDays.friday}  value={workingDays.friday} onChange={handleDayChange}/></label>
                            <label htmlFor="saturday">Saturday: <input id="saturday" name="saturday" type="checkbox" checked={workingDays.saturday} value={workingDays.saturday} onChange={handleDayChange}/></label>
                            <label htmlFor="sunday">Sunday: <input id="sunday" name="sunday" type="checkbox" checked={workingDays.sunday} value={workingDays.sunday} onChange={handleDayChange}/></label>
                        </div>
                    </div>
                    <button type="submit" className="text-lime-500">Create Doctor</button>
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

export default CreateDoctor;