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
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/locations/${location}`);
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
            <h1 className="my-1 underline">{"Location: " + selectedLocationName}</h1>
            <h1>Select Doctor:</h1>
            <div className="grid grid-cols-1 text-center">
                {doctors.map((doctor) => (
                    <Link className="border-2 border-solid border-black my-1 bg-sky-600 text-white p-5"to={`/appointments/${location}/${doctor.doctor_id}`} key={doctor.doctor_id} state={{ selectedLocationName: selectedLocationName, selectedDoctorName: `${doctor.first_name} ${doctor.last_name}` }}>
                        {doctor.first_name + ' ' + doctor.last_name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Doctor;