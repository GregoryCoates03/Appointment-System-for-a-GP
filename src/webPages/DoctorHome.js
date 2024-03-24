import axios from "axios";
import { useEffect, useState } from "react";

const DoctorHome = (props) => {
    const { doctor , user } = props;
    const [appointments, setAppointments] = useState([]);

    const getUpcomingAppointments = async () => {
        const response = await axios.get(`http://localhost:3001/api/get-appointments/${doctor}`);
        setAppointments(response.data);
    }

    useEffect(() => {
        getUpcomingAppointments();
    }, []);

    if (doctor) {
        return (
            <div className="flex flex-col items-center border-2">
                <h1 className="underline">Hello {user.first_name}</h1>
                <h2 className="underline">Upcoming Patients</h2>
                <div className="grid grid-cols-1 text-center">
                {appointments.filter((appointment) => {
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
                    <div className="border-2 border-solid border-black my-1 bg-sky-600 text-white p-5 text-left">
                        <h1>{"Patient: " + appointment.first_name + " " + appointment.family_name}</h1>
                        <h1>{"Date: " + new Date(appointment.date).toLocaleDateString()}</h1>
                        <h1>{"Time: " + appointment.time.split(":").slice(0, 2).join(":")}</h1>
                    </div>
                ))}
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

export default DoctorHome;