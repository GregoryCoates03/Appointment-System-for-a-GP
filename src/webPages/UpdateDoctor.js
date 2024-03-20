import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateDoctor } from "../databaseInteraction";

const UpdateDoctor = (props) => {
    const { admin } = props;

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [doctorDetails, setDoctorDetails] = useState(null);

    const getLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/locations/`);
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDoctors = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/locations/${selectedLocation}`);
            console.log(response.data)
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDoctorDetails = async () => {
        try {
            setDoctorDetails(null);
            const response = await axios.get(`http://localhost:3001/api/doctors/${selectedDoctor}`);
            console.log(response.data[0]);
            setDoctorDetails(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        setSelectedDoctor(null);
        getDoctors();
    }, [selectedLocation]);

    useEffect(() => {
        getDoctorDetails();
    }, [selectedDoctor]);

    const handleLocationChange = (event) => {
        console.log(event.target.value);
        if (event.target.value === "SELECT A LOCATION"){
            setSelectedLocation(null);
            setDoctorDetails(null);
            setSelectedDoctor(0);
        } else {
            setSelectedLocation(event.target.value);
            setSelectedDoctor(0);
        }
    }

    const handleDoctorChange = (event) => {
        console.log(event.target.value);
        if (event.target.value === "SELECT A DOCTOR"){
           setDoctorDetails(null); 
           setSelectedDoctor(event.target.value);
        } else {
            setSelectedDoctor(event.target.value);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDoctorDetails((previousDoctorDetails) => ({...previousDoctorDetails, [name]: value}));
        console.log(name, value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { first_name, last_name, location_id, start_time, break_time, end_time, doctor_id } = doctorDetails;
        const error = document.getElementById('error');
        updateDoctor({ first_name, last_name, location_id, start_time, break_time, end_time, doctor_id }).then((response) => {
            if (response === false){
                error.textContent = "Error";
            } else {
                error.textContent = "Doctor updated";
                error.className = "text-green-500";
            }
        }).catch((error) => {
            console.log(error);
        });
    }
    
    if (admin) {
        return (
            <div className="flex flex-col items-center border-2">
                <h1>Update Doctor</h1>
                <h1>Location:</h1>
                <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                    <option>SELECT A LOCATION</option>
                    {locations.map((location) => (
                        <option key={"location" + location.location_id} value={location.location_id}>
                            {location.location_name}
                        </option>
                    ))}
                </select>
                <h1>Doctor:</h1>
                <select id="doctors_dropdown" className="bg-gray-400" value={selectedDoctor} onChange={handleDoctorChange}>
                    <option value={0} >SELECT A DOCTOR</option>
                    {doctors.map((doctor) => (
                        <option key={"doctor" + doctor.doctor_id} value={doctor.doctor_id}>
                            {doctor.first_name + doctor.last_name}
                        </option>
                    ))}
                </select>
                <div>
                    { doctorDetails ?   <div>
                                            <form className="flex flex-col" onSubmit={handleSubmit}>
                                                <label htmlFor="first_name">First Name:</label>
                                                <input id="first_name" name="first_name" type="text" className="bg-gray-400" value={doctorDetails.first_name} onChange={handleChange}/>
                                                <label htmlFor="last_name">Last Name:</label>
                                                <input id="last_name" name="last_name" type="text" className="bg-gray-400" value={doctorDetails.last_name} onChange={handleChange}/>
                                                <label htmlFor="location">Location:</label>
                                                <select id="location_id" name="location_id" className="bg-gray-400" value={doctorDetails.location_id} onChange={handleChange}>
                                                    {locations.map((location) => (
                                                        <option key={"location" + location.location_id} value={location.location_id}>
                                                            {location.location_name}
                                                        </option>
                                                    ))}
                                                </select>
                                                <label htmlFor="start_time">Start Time:</label>
                                                <input id="start_time" name="start_time" type="text" className="bg-gray-400" value={doctorDetails.start_time} onChange={handleChange}/>
                                                <label htmlFor="break_time">Break Time:</label>
                                                <input id="break_time" name="break_time" type="text" className="bg-gray-400" value={doctorDetails.break_time} onChange={handleChange}/>
                                                <label htmlFor="end_time">End Time:</label>
                                                <input id="end_time" name="end_time" type="text" className="bg-gray-400" value={doctorDetails.end_time} onChange={handleChange}/>
                                                <button type="submit" className="text-lime-500">Update Account</button>
                                            </form>
                                            <p id="error" className="text-red-500"></p>
                                        </div>
                                    : 
                                        ''}
                </div>
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

export default UpdateDoctor;