import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    const getDoctors = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/doctors/`);
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
            <h1>Update Doctor</h1>
        </div>
    )
}

export default UpdateDoctor;