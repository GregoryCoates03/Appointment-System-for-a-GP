import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { Link, useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Dates = () => {
    const { doctor } = useParams();
    const loc = useLocation();
    const { selectedLocationName, selectedDoctorName } = loc.state;
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 13);

    const [date] = useState(new Date());
    const [maxDate] = useState(endDate);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [days, setDays] = useState([]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const doctorDates = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/doctor-days?doctor_id=${doctor}`);
        const week = response.data[0];
        const offDays = [];
        
        for (const day in week){
            if (!week[day]){
                offDays.push(day);
            }
        }

        setDays(offDays);
    }

    useEffect(() => {
        doctorDates();
    }, []);

    useEffect(() => {
        const today = new Date();

        for (let i = 0; i < 14; i++){
            const day = new Date(today);
            day.setDate(day.getDate() + i);
            const dayOfWeek = day.getDay();

            if (!days.includes(daysOfWeek[dayOfWeek])) {
                setSelectedDate(day);
                break;
            }
        }

    }, [days]);

    return (
        <div className="flex flex-col items-center my-1">
            <h1 className="underline">{"Location: " + selectedLocationName}</h1>
            <h1 className="underline">{"Doctor: " + selectedDoctorName}</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={date} maxDate={maxDate} tileDisabled={({ date }) => { 
                const day = new Date(date);
                const dayOfWeek = day.getDay();
                return days.includes(daysOfWeek[dayOfWeek]); 
            }}/>
            <h1>Selected Date: {selectedDate.toLocaleDateString()}</h1>
            <Link to={`${encodeURIComponent(selectedDate.toLocaleDateString())}`} className="bg-sky-600 text-white my-1 border-2 border-black" state={{ selectedLocationName: selectedLocationName, selectedDoctorName: selectedDoctorName }}>SELECT TIME</Link>
        </div>
    )
}

export default Dates;