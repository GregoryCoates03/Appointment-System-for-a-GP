import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link, useParams, useLocation } from "react-router-dom";

const Dates = () => {
    const { location, doctor } = useParams();
    const loc = useLocation();
    const { selectedLocationName, selectedDoctorName } = loc.state;

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 13);

    const [date] = useState(new Date());
    const [maxDate] = useState(endDate);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    return (
        <div className="flex flex-col items-center my-1">
            <h1 className="underline">{"Location: " + selectedLocationName}</h1>
            <h1 className="underline">{"Doctor: " + selectedDoctorName}</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={date} maxDate={maxDate}/>
            <h1>Selected Date: {selectedDate.toLocaleDateString()}</h1>
            <Link to={`${encodeURIComponent(selectedDate.toLocaleDateString())}`} className="bg-sky-600 text-white my-1 border-2 border-black" state={{ selectedLocationName: selectedLocationName, selectedDoctorName: selectedDoctorName }}>SELECT TIME</Link>
        </div>
    )
}

export default Dates;