import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Time = () => {
    const { location, doctor, date } = useParams();

    const [doctorDetails, setDoctorDetails] = useState(null);

    const [times, setTimes] = useState([]);

    const [booked, setBooked] = useState([]);

    const [waitingList, setWaitingList] = useState(false);

    const loc = useLocation();
    const { selectedLocationName, selectedDoctorName } = loc.state;

    const navigate = useNavigate();

    const getDoctorDetails = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/doctors/${doctor}`);
            setDoctorDetails(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const checkWaitingList = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/check-user-on-waiting-list?date=${date}&doctor_id=${doctor}&location_id=${location}`);
            console.log(response.data);
            if (response.data.length > 0){
                setWaitingList(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDoctorDetails();
    }, [doctor]);
    
    useEffect(() => {
        getBooked();
    }, [doctorDetails]);
    
    useEffect(() => {
        createDate();
        checkWaitingList();
    }, [booked]);

    const createDate = () => {
        const dateParts = date.split("/");
        if (doctorDetails) {
            //console.log(doctorDetails[0]);
            //console.log(doctorDetails[0].start_time);
    
            const startParts = doctorDetails[0].start_time.split(":");
            const endParts = doctorDetails[0].end_time.split(":");
            const breakParts = doctorDetails[0].break_time.split(":");
        
            const startTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], startParts[0], startParts[1], startParts[2]); // https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object
            const endTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], endParts[0], endParts[1], endParts[2]);
            const breakTime = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], breakParts[0], breakParts[1], breakParts[2]);
            
            console.log(startTime);
            createTimes(startTime, endTime, breakTime);
        }
    }

    const getBooked = async () => {
        try {
            const [day, month, year] = date.split("/");
            const ISODate = new Date(`${year}-${month}-${day}`).toISOString();
            const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/booked-appointments/${location}/${doctor}/${ISODate}`);
            
            const bookedTimes = response.data.map(appointment => appointment.time);
            
            setBooked(bookedTimes);
        } catch (error) {
            console.log(error);
        }
    }

    const createTimes = (startTime, endTime, breakTime) => {
        const times = [];
        console.log(booked);
        let time = startTime;
        let endOfBreakTime = new Date(breakTime);
        endOfBreakTime.setMinutes(time.getMinutes() + 40);
        console.log("a" + breakTime);
        console.log("b" + endOfBreakTime);

        const currentTime = new Date();

        while (time < endTime){
            //console.log(time);
            //console.log(`${String(time.getUTCHours()).length === 1 ? "0" + time.getUTCHours() : time.getUTCHours()}:${String(time.getUTCMinutes()).length === 1 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()}:00`);
            //console.log(`${String(time.getUTCHours()).length === 1 ? "0" + time.getUTCHours() : time.getUTCHours()}:${String(time.getUTCMinutes()).length === 1 ? "0" + time.getUTCMinutes() : time.getUTCMinutes()}:00`);
            /*console.log("aaaaaaaaa" + typeof time)
            console.log(time2.getUTCHours())
            console.log(time2.getUTCMinutes())
            console.log(time2.getUTCHours() + ":" + time2.getMinutes());*/
            if (!(time >= breakTime && time < endOfBreakTime) && time > currentTime){
                if (!booked.includes(`${String(time.getHours()).length === 1 ? "0" + time.getHours() : time.getHours()}:${String(time.getMinutes()).length === 1 ? "0" + time.getMinutes() : time.getMinutes()}:00`)){
                    times.push(new Date(time));
                }
            }
            time.setMinutes(time.getMinutes() + 20);
        }

        setTimes(times);
        //console.log(times);
    }

    const handleClick = async () => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/join-waiting-list/`, { location_id: location, doctor_id: doctor, date });
            const response2 = await axios.put('http://localhost:3001/api/increment');
            const button = document.getElementById("waiting_list")
            button.textContent = "Joined Waiting List"
            button.className = "bg-green-500 text-black my-1 border-2 border-black"
            button.disabled = true;
            
            console.log(response.data); 
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col items-center my-1">
            <h1 className="underline">{"Location: " + selectedLocationName}</h1>
            <h1 className="underline">{"Doctor: " + selectedDoctorName}</h1>
            <h1 className="underline">{"Date: " + date}</h1>
            {times.length > 0 ? times.map((time) => (
                <Link className="bg-sky-600 text-white my-1 border-2 border-black" to={`/appointments/${location}/${doctor}/${encodeURIComponent(date)}/${time.toLocaleTimeString()}`} state={{selectedLocationName: selectedLocationName, selectedDoctorName: selectedDoctorName }}>{time.toLocaleTimeString().split(':').slice(0,2).join(':')}</Link>
            )) : (
                    <div className="flex flex-col items-center my-1">
                        <h1 className="text-red-500">{`Sorry, there are no appointments with ${selectedDoctorName} available on ${date}`}</h1>
                        <button id="waiting_list" className={waitingList ? "bg-red-500 text-white my-1 border-2 border-black" : "bg-sky-600 text-white my-1 border-2 border-black"} onClick={waitingList ? '' : handleClick} disabled={waitingList ? true : false}>{waitingList ? 'Already On Waiting List' : 'Join Waiting List'}</button>
                        <button className="bg-sky-600 text-white my-1 border-2 border-black" onClick={() => navigate(-1)}>Book a Different Day</button>
                    </div>
                )}
        </div>
    )
}

export default Time;