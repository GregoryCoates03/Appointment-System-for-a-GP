import React from "react";
import { useParams } from "react-router-dom";

const Time = () => {
    const { date } = useParams();

    return (
        <div className="flex flex-col items-center">
            <h1>{date}</h1>
        </div>
    )
}

export default Time;