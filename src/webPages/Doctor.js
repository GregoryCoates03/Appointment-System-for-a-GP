import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const Doctor = (props) => {
    const [doctors, setDoctors] = useState([]);
    const { location } = useParams();
    const loc = useLocation();
    const { selectedLocationName } = loc.state;

    const getDoctors = async () => {
        try {
            console.log(location);
            const response = await axios.get(`http://localhost:3001/api/locations/${location}`);
            setDoctors(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <div className="flex flex-col items-center">
            {/* UPDATE THIS SO IT SAYS THE LOCATION NAME NOT THE LOCATION ID*/}
            <h1 className="text-red-500">{selectedLocationName} - UPDATE THIS SO IT SAYS THE LOCATION NAME NOT THE LOCATION ID</h1>
            <h1>Select Doctor:</h1>
            {doctors.map((doctor) => (
                <Link to={`/appointments/${location}/${doctor.doctor_id}`} key={doctor.doctor_id} state={{ selectedLocationName: selectedLocationName, selectedDoctorName: `${doctor.first_name} ${doctor.last_name}` }}>
                    {doctor.first_name + ' ' + doctor.last_name}
                </Link>
            ))}
        </div>
    )
}

export default Doctor;