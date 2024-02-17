import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";
import axios from "axios";

const Appointments = (props) => {
    const { user, signedIn } = props;
    console.log(user);

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(user.preferred_doctors);
    
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

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    }

    return (
        <div className="flex flex-col items-center">
            { signedIn ? 
                <>
                    <button className="bg-sky-600 text-white">UPCOMING AND PAST</button>
                    <h1>Preferred Location: {user.preferred_doctors}</h1>
                    <h1>Selected Location: {selectedLocation}</h1>
                    <h1>Select Different Location:</h1>
                    <select value={selectedLocation} onChange={handleLocationChange} >
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                    <Link to={`/appointments/${selectedLocation}`} className="bg-sky-600 text-white">Select Doctor </Link>
                </>
                : <Link to='/sign-in/' className="bg-sky-600 text-white">Sign In</Link>
            }
        </div>
    )
}

export default Appointments;