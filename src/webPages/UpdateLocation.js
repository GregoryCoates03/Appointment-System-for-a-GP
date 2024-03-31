import { useEffect, useState } from "react";
import axios from "axios";
import { updateLocation } from "../databaseInteraction";

const UpdateLocation = (props) => {
    const { admin } = props;

    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationName, setLocationName] = useState(null);

    const getLocations = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations`);
            setLocations(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocations();
    }, []);

    const handleLocationChange = (event) => {
        console.log(event.target.value);
        setSelectedLocation(event.target.value);
    }

    const handleChange = (event) => {
        setLocationName(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const error = document.getElementById('error');
        updateLocation({ selectedLocation, locationName }).then((response) => {
            if (response === false){
                error.textContent = "Error";
            } else {
                error.textContent = "Location updated";
                error.className = "text-green-500";
            }
        }).catch((error) => {
            console.log(error);
        });
    }


    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Update Location</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <select className="bg-gray-400" value={selectedLocation} onChange={handleLocationChange}>
                        {locations.map((location) => (
                            <option key={location.location_id} value={location.location_id}>
                                {location.location_name}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="location_name">Updated Name:</label>
                    <input id="location_name" name="location_name" type="text" className="bg-gray-400" value={locationName} onChange={handleChange}/>
                    <button type="submit" className="text-lime-500">Update Location</button>
                </form>
                <p id="error" className="text-red-500"></p>
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

export default UpdateLocation;