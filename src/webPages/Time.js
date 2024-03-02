import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Time = () => {
    const { location, doctor, date } = useParams();

    const [doctorDetails, setDoctorDetails] = useState(null);

    const [times, setTimes] = useState([]);

    const [booked, setBooked] = useState([]);

    const getDoctorDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/doctors/${doctor}`);
            setDoctorDetails(response.data);
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
    }, [booked]);

    const createDate = () => {
        const dateParts = date.split("/");
        if (doctorDetails) {
            //console.log(doctorDetails[0]);
            //console.log(doctorDetails[0].start_time);
    
            const startParts = doctorDetails[0].start_time.split(":");
            const endParts = doctorDetails[0].end_time.split(":");
        
            const start = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], startParts[0], startParts[1], startParts[2]); // https://stackoverflow.com/questions/33299687/how-to-convert-dd-mm-yyyy-string-into-javascript-date-object
            const end = new Date(dateParts[2], dateParts[1] - 1, dateParts[0], endParts[0], endParts[1], endParts[2]);
            console.log(start);
            createTimes(start, end);
        }
    }

    const getBooked = async () => {
        try {
            const [day, month, year] = date.split("/");
            const ISODate = new Date(`${year}-${month}-${day}`).toISOString();
            const response = await axios.get(`http://localhost:3001/api/booked-appointments/${location}/${doctor}/${ISODate}`);
            
            const bookedTimes = response.data.map(appointment => appointment.time);
            
            setBooked(bookedTimes);
        } catch (error) {
            console.log(error);
        }
    }

    const createTimes = (start, end) => {
        const times = [];
        console.log(booked);
        let time = start;

        while (time < end){
            //console.log(time);
            console.log(`${time.getUTCHours()}:${time.getUTCMinutes() < 10 ? "00" : time.getUTCMinutes()}:00`);
            /*console.log("aaaaaaaaa" + typeof time)
            console.log(time2.getUTCHours())
            console.log(time2.getUTCMinutes())
            console.log(time2.getUTCHours() + ":" + time2.getMinutes());*/
            if (!booked.includes(`${time.getUTCHours()}:${time.getUTCMinutes() < 10 ? "00" : time.getUTCMinutes()}:00`)){
                times.push(new Date(time));
            }
            time.setMinutes(time.getMinutes() + 20);
        }

        setTimes(times);
        //console.log(times);
    }

    return (
        <div className="flex flex-col items-center">
            <h1>{doctor}</h1>
            <h1>{date}</h1>
            {times.map((time) => (
                <Link to={`/appointments/${location}/${doctor}/${encodeURIComponent(date)}/${time.toLocaleTimeString()}`}>{time.toLocaleTimeString().split(':').slice(0,2).join(':')}</Link>
            ))}
        </div>
    )
}

export default Time;