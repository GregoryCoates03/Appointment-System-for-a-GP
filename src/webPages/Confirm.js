import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Confirm = () => {
    const { location, doctor, date, time } = useParams();
    const loc = useLocation();

    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams/URLSearchParams
    const cancellation = new URLSearchParams(loc.search).get("cancellation");
    console.log(cancellation);
    const navigate = useNavigate();
    console.log(loc)
    //const { selectedLocationName, selectedDoctorName } = loc.state || {};
    const [selectedLocationName, setSelectedLocationName] = useState("");
    const [selectedDoctorName, setSelectedDoctorName] = useState("");

    useEffect(() => {
        const checkSignedIn = async () => {
            const response = await axios.get(`http://localhost:3001/api/signed-in`);
            if (!response.data.isAuthenticated){
                console.log(loc.pathname);
                navigate('/sign-in/', { state: { prev: loc.pathname }});
            }
        }
        checkSignedIn();

        if (!loc.state || !selectedLocationName || !selectedDoctorName){
            const fetchNames = async () => {
                const locationData = await axios.get(`http://localhost:3001/api/location/${location}`);
                const doctorData = await axios.get(`http://localhost:3001/api/doctors/${doctor}`);  
                setSelectedLocationName(locationData.data[0].location_name);
                setSelectedDoctorName(doctorData.data[0].first_name + " " + doctorData.data[0].last_name);
            }
            fetchNames();
        } else {
            setSelectedLocationName(loc.state.selectedLocationName);
            setSelectedDoctorName(loc.state.selectedDoctorName);
        }
    }, [])

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/appointments/', {
                appointment_type: "Test",
                doctor_id: doctor,
                date: date,
                time: time,
                location_id: location
            })
            const button = document.getElementById('button');
            if (response.data) {
                button.className = "bg-blue-500 my-1 border-2 border-black text-black";
                button.disabled = true;
                button.textContent = "Appointment Booked"
                axios.post('http://localhost:3001/api/confirmation/', {
                    text: `Appointment with ${selectedDoctorName} in ${selectedLocationName} at ${time} is booked.`
                });
            }
            if (cancellation) {
                axios.delete(`http://localhost:3001/api/check-waiting-list?doctor_id=${doctor}&location_id=${location}&date=${date}`);
                axios.put(`http://localhost:3001/api/reset`);
            }
            console.log(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center flex-col my-1">
            <h1 className="underline">{"Location: " + selectedLocationName}</h1>
            <h1 className="underline">{"Doctor: " + selectedDoctorName}</h1>
            <h1 className="underline">{"Date: " + date}</h1>
            <h1 className="underline">{"Time: " + time.split(":").slice(0, 2).join(":")}</h1>
            <button id="button" className="bg-lime-500 my-1 border-2 border-black text-black" onClick={handleClick}>Confirm Appointment</button>
        </div>
    )
}

export default Confirm;