import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

const Confirm = () => {
    const { location, doctor, date, time } = useParams();
    const loc = useLocation();
    console.log(loc)
    const { selectedLocationName, selectedDoctorName } = loc.state;

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
                })
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