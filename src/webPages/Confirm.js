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
                button.className = "text-red-500";
                button.disabled = true;
                button.textContent = "Appointment Booked"
            }
            console.log(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center flex-col">
            <h1>{selectedLocationName}</h1>
            <h1>{selectedDoctorName}</h1>
            <h1>{date}</h1>
            <h1>{time}</h1>
            <button id="button" className="text-lime-500" onClick={handleClick}>Confirm Appointment</button>
        </div>
    )
}

export default Confirm;