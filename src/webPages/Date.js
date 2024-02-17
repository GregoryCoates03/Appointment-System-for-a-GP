import React, { useState } from "react";
import Calendar from "react-calendar";
import { Link, useParams } from "react-router-dom";

const Dates = () => {
    const { location, doctor } = useParams();

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 13);

    const [date] = useState(new Date());
    const [maxDate] = useState(endDate);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    return (
        <div className="flex flex-col items-center">
            <h1>{location}</h1>
            <h1>{doctor}</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={date} maxDate={maxDate}/>
            <h1>Selected Date: {selectedDate.toLocaleDateString()}</h1>
            <Link to={`${encodeURIComponent(selectedDate.toLocaleDateString())}`} className="bg-sky-600 text-white">SELECT TIME</Link>
        </div>
    )
}

export default Dates;