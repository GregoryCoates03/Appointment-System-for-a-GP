import React, { useState, useEffect } from "react";
import axios from "axios";

const UpcomingAndPast = () => {
    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/appointments/`);
            setAppointments(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAppointments();
    }, []);

    return (
        <div className="flex items-center flex-col border-2">
            <div className="items-center grid grid-cols-2 gap-4">
                <h1>Upcoming Appointments</h1>
                <h1>Past Appointments</h1>
                {
                    appointments.map((appointment) => (
                        <div key={appointment.appointment_id}>
                            <h1>{appointment.appointment_type}</h1>
                            <h1>{appointment.date}</h1>
                            <h1>{appointment.time}</h1>
                            <h1>{appointment.location_name}</h1>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default UpcomingAndPast;