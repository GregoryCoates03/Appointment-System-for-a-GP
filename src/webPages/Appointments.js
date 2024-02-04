import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Appointments = (props) => {
    const { user } = props;
    console.log(user);

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState("");

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 13);
    
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

    const [date] = useState(new Date());
    const [maxDate] = useState(endDate);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (date) => {
        setSelectedDate(date);
    }

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    }

    return (
        <div className="flex flex-col items-center">
            <button className="bg-sky-600 text-white">UPCOMING AND PAST</button>
            <h1 className="bg-sky-600 text-white">{user.preferred_doctors}</h1>
            <Calendar onChange={handleDateChange} value={selectedDate} minDate={date} maxDate={maxDate}/>
            <h1>Selected Date: {selectedDate.toLocaleDateString()}</h1>
            <Link to={`${encodeURIComponent(selectedDate.toLocaleDateString())}`} className="bg-sky-600 text-white">SELECT TIME</Link>
            <select value={selectedLocation} onChnage={handleLocationChange}>
                {locations.map((location) => (
                    <option key={location.id} value={location.location_name}>
                        {location.location_name}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Appointments;