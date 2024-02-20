import { useParams } from "react-router-dom";
import axios from "axios";

const Confirm = () => {
    const { location, doctor, date, time } = useParams();

    const handleClick = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/appointments/', {
                appointment_type: "Test",
                practitioner: doctor,
                date: date,
                time: time,
                location_id: location
            })
            console.log(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center flex-col">
            <h1>{location}</h1>
            <h1>{doctor}</h1>
            <h1>{date}</h1>
            <h1>{time}</h1>
            <button className="text-lime-500" onClick={handleClick}>Confirm Appointment</button>
        </div>
    )
}

export default Confirm;