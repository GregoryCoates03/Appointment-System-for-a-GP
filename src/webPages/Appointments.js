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
    const [selectedLocationName, setSelectedLocationName] = useState("");
    let preferredLocationName = "";
    
    const getLocations = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/locations`);
            setLocations(response.data);
            console.log(locations);
            const location = response.data.find((location) => location.location_id == user.preferred_doctors);
            preferredLocationName = location.location_name;
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        console.log(selectedLocation)
        const location = locations.find((location) => location.location_id == event.target.value);
        setSelectedLocationName(location.location_name);
    }

    return (
        <div className="flex flex-col items-center my-1">
            { signedIn ? 
                <>
                    <Link to={'/appointments/upcoming-and-past/'} className="bg-sky-600 text-white border-solid border-2 border-black">UPCOMING AND PAST</Link>
                    <h1>Preferred Location: {preferredLocationName}</h1>
                    <h1>Selected Location: {selectedLocationName}</h1>
                    <h1>Select Different Location:</h1>
                    <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange} >
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                    {/*https://ui.dev/react-router-pass-props-to-link*/}
                    <Link to={`/appointments/${selectedLocation}`} state={{ selectedLocationName: selectedLocationName }} className="bg-sky-600 text-white my-1 border-2 border-black">Select Doctor </Link>
                </>
                : <Link to='/sign-in/' className="bg-sky-600 text-white">Sign In</Link>
            }
        </div>
    )
}

export default Appointments;