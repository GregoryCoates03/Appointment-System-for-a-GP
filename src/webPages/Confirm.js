import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import waitingList from "../waitingListSort";

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

    const [userId, setUserId] = useState("");

    const [exists, setExists] = useState(false);

    useEffect(() => {
        const checkSignedIn = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/signed-in`);
            if (!response.data.isAuthenticated){
                console.log(loc.pathname);
                navigate('/sign-in/', { state: { prev: loc.pathname, query: '?cancellation=true' }});
            }
            setUserId(response.data.user.user_id);
        }
        checkSignedIn();

        if (!loc.state || !selectedLocationName || !selectedDoctorName){
            const fetchNames = async () => {
                const locationData = await axios.get(`${process.env.REACT_APP_SERVER}/api/location/${location}`);
                const doctorData = await axios.get(`${process.env.REACT_APP_SERVER}/api/doctors/${doctor}`);  
                setSelectedLocationName(locationData.data[0].location_name);
                setSelectedDoctorName(doctorData.data[0].first_name + " " + doctorData.data[0].last_name);
            }
            fetchNames();
        } else {
            setSelectedLocationName(loc.state.selectedLocationName);
            setSelectedDoctorName(loc.state.selectedDoctorName);
        }
        checkAvailable();
    }, [])

    const checkAvailable = async () => {
        try {
            const [day, month, year] = date.split("/");
            const ISODate = new Date(`${year}-${month}-${day}`).toISOString();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/booked-appointments/${location}/${doctor}/${ISODate}`);

            if (response.data.some((appointment) => appointment.time === time)){
                setExists(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = async () => {
        try {
            const [day, month, year] = date.split("/");
            const ISODate = new Date(`${year}-${month}-${day}`).toISOString();
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/appointments/`, {
                appointment_type: "Test",
                doctor_id: doctor,
                date: ISODate,
                time: time,
                location_id: location
            })
            const button = document.getElementById('button');
            if (response.data) {
                button.className = "bg-blue-500 my-1 border-2 border-black text-black";
                button.disabled = true;
                button.textContent = "Appointment Booked"
                axios.post(`${process.env.REACT_APP_SERVER}/api/confirmation/`, {
                    text: `Appointment with ${selectedDoctorName} in ${selectedLocationName} at ${time} is booked.`,
                    doctor: selectedDoctorName,
                    location: selectedLocationName,
                    date,
                    time
                });
            }
            if (cancellation) {
                axios.delete(`${process.env.REACT_APP_SERVER}/api/check-waiting-list?doctor_id=${doctor}&location_id=${location}&date=${date}`);
                axios.put(`${process.env.REACT_APP_SERVER}/api/reset`);
            }
            console.log(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    const declineAppointment = async () => {
        const waiting_list = new waitingList(location, doctor, date);
        waiting_list.waitingListSort().then(async (sorted) => {
            if (sorted.length > 0){
                console.log(sorted);
                const next_user = sorted.findIndex((user) => user.user_id === userId);
                console.log(next_user)
                if (next_user != -1){
                    const next_user_id = sorted[next_user].user_id;
                    //const top_user = sorted[0].user_id;
                    //console.log(top_user)
                    const response1 = await axios.get(`${process.env.REACT_APP_SERVER}/api/users/${next_user_id}`);
                    console.log(response1.data[0]);
                    const { email } = response1.data[0];
                    const response2 = await axios.post(`${process.env.REACT_APP_SERVER}/api/available-appointment`, { email, location, doctor, date, time });
                    console.log(response2);
                }
            }
        });
    }

    return (
        <div className="flex items-center flex-col my-1">
            <h1 className="underline">{"Location: " + selectedLocationName}</h1>
            <h1 className="underline">{"Doctor: " + selectedDoctorName}</h1>
            <h1 className="underline">{"Date: " + date}</h1>
            <h1 className="underline">{"Time: " + time.split(":").slice(0, 2).join(":")}</h1>
            <button id="button" className={`${exists ? 'bg-red-500' : 'bg-lime-500'} my-1 border-2 border-black text-black`} onClick={handleClick} disabled={exists}>{exists ? 'Appointment Unavailable' : 'Confirm Appointment' }</button>
            { cancellation && !exists ? <button id="button" className="bg-lime-500 my-1 border-2 border-black text-black" onClick={declineAppointment}>Decline Appointment</button> : ''}
        </div>
    )
}

export default Confirm;