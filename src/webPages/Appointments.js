import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Appointments = (props) => {
    const { user, signedIn } = props;
    const navigate = useNavigate();
    const loc = useLocation();
    console.log(user);

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(user.location_id);
    const [selectedLocationName, setSelectedLocationName] = useState("");
    const [preferredLocationName, setPreferredLocationName] = useState("");
    
    const getLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations`);
            setLocations(response.data);
            //console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const setLocationNames = async () => {
        try {
            //console.log(locations)
            //console.log(user.location_id)
            const location = locations.find((location) => location.location_id === user.location_id);
            //console.log(location)
            if (location) {
                setPreferredLocationName(location.location_name);
                setSelectedLocationName(location.location_name);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (!signedIn) {
            navigate('/sign-in', { state: { prev: loc.pathname }});
        }
        getLocations();
    }, []);

    useEffect(() => {
        setLocationNames();
    }, [locations, user.location_id]);

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
        //console.log(selectedLocation)
        const location = locations.find((location) => location.location_id == event.target.value);
        setSelectedLocationName(location.location_name);
    }

    if (signedIn) {
        return (
            <div className="flex flex-col items-center my-1">
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
                <Link to={`/appointments/${selectedLocation}`} state={{ selectedLocationName: selectedLocationName }} className="bg-sky-600 text-white my-1 border-2 border-black">Select Doctor</Link>
            </div>
        )
    }
}

export default Appointments;