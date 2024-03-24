import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingAndPast = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/appointments/`);
            setAppointments(response.data);
            console.log(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    const handleClick = async (appointment_id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/appointments/${appointment_id}`);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center flex-col border-2">
            <div className="text-center grid grid-cols-2 gap-4">
                <div>
                <h1 className="underline">Upcoming Appointments</h1>
                {
                    appointments.filter((appointment) => {
                        const date = new Date(appointment.date);
                        const split_time = appointment.time.split(":");
                        date.setHours(split_time[0]);
                        date.setMinutes(split_time[1]);
                        date.setSeconds(split_time[2]);
                        
                        const current_time = new Date();
                        
                        return date > current_time;
                    }).sort((a, b) => {
                        const dates = new Date(a.date) - new Date(b.date);
                        
                        if (dates === 0) {
                            return new Date(a.time) - new Date(b.time);
                        } else {
                            return dates;
                        }
                    }).map((appointment) => (
                        <div className="border-2 border-solid border-black my-1 bg-sky-600 text-white p-5 text-left" key={appointment.appointment_id}>
                            <h1>{"Date: " + new Date(appointment.date).toLocaleDateString()}</h1>
                            <h1>{"Time: " + appointment.time.split(":").slice(0, 2).join(":")}</h1>
                            <h1>{"Location: " + appointment.location_name}</h1>
                            <h1>{"Doctor: " + appointment.first_name + " " + appointment.last_name}</h1>
                            <button className="border-2 border-solid border-black my-1 bg-red-500 text-white p-5 text-left" onClick={() => handleClick(appointment.appointment_id)}>Cancel Appointment</button>
                        </div>
                    ))
                }
                </div>
                <div>
                <h1 className="underline">Past Appointments</h1>
                {
                    appointments.filter((appointment) => {
                        const date = new Date(appointment.date);
                        const split_time = appointment.time.split(":");
                        date.setHours(split_time[0]);
                        date.setMinutes(split_time[1]);
                        date.setSeconds(split_time[2]);
                        
                        const current_time = new Date();
                        
                        return date <= current_time;
                    }).sort((a, b) => {
                        const dates = new Date(a.date) - new Date(b.date);
                        
                        if (dates === 0) {
                            return new Date(a.time) - new Date(b.time);
                        } else {
                            return dates;
                        }
                    }).map((appointment) => (
                        <div className="border-2 border-solid border-black my-1 bg-sky-600 text-white p-5 text-left" key={appointment.appointment_id}>
                            <h1>{"Date: " + new Date(appointment.date).toLocaleDateString()}</h1>
                            <h1>{"Time: " + appointment.time.split(":").slice(0, 2).join(":")}</h1>
                            <h1>{"Location: " + appointment.location_name}</h1>
                            <h1>{"Doctor: " + appointment.first_name + " " + appointment.last_name}</h1>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default UpcomingAndPast;