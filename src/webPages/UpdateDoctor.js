import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateDoctor } from "../databaseInteraction";

const UpdateDoctor = (props) => {
    const { admin } = props;

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(0);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(0);
    const [doctorDetails, setDoctorDetails] = useState(null);

    const [workingDays, setWorkingDays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false,
        saturday: false,
        sunday: false
    });

    const getLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations/`);
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDoctors = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations/${selectedLocation}`);
            //console.log(response.data)
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getDoctorDetails = async () => {
        try {
            setDoctorDetails(null);
            if (selectedDoctor !== 0){
                const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/doctors/${selectedDoctor}`);
                //console.log(response.data[0]);
                setDoctorDetails(response.data[0]);

                const response2 = await axios.get(`${process.env.REACT_APP_SERVER}/api/doctor-days?doctor_id=${selectedDoctor}`);
                //console.log(response2.data[0])
                setWorkingDays(response2.data[0]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    useEffect(() => {
        setSelectedDoctor(0);
        if (selectedLocation !== null){
            getDoctors();
        }
    }, [selectedLocation]);

    useEffect(() => {
        getDoctorDetails();
    }, [selectedDoctor]);

    useEffect(() => {
        console.log(workingDays);
    }, [workingDays])

    const handleLocationChange = (event) => {
        //console.log(event.target.value);
        if (event.target.value === "SELECT A LOCATION"){
            setSelectedLocation(0);
            setDoctorDetails(0);
            setSelectedDoctor(0);
        } else {
            setSelectedLocation(event.target.value);
            setSelectedDoctor(0);
        }
    }

    const handleDoctorChange = (event) => {
        //console.log(event.target.value);
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
        //console.log(name, value);
    }

    const handleDayChange = (event) => {
        const { name, checked } = event.target;
        setWorkingDays((previousWorkingDays) => ({...previousWorkingDays, [name]: checked}));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        const { first_name, last_name, location_id, start_time, break_time, end_time, doctor_id } = doctorDetails;
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = workingDays;
        const error = document.getElementById('error');
        updateDoctor({ first_name, last_name, location_id, start_time, break_time, end_time, doctor_id, monday, tuesday, wednesday, thursday, friday, saturday, sunday }).then((response) => {
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
                <h1 className="underline">Update Doctor</h1>
                <h1>Location:</h1>
                <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                    <option value={0}>SELECT A LOCATION</option>
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
                            {doctor.first_name + " " + doctor.last_name}
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
                                                <label htmlFor="working_days">Working Days:</label>
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
                                                <button type="submit" className="text-lime-500">Update Doctor</button>
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