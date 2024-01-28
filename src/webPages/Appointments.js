import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { Link } from "react-router-dom";

class Appointments extends React.Component {
    constructor(props){
        super(props);

        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 13);

        this.state = {
            date: new Date(),
            maxDate: endDate,
            selectedDate: new Date()
        }
    }

    setDate = (date) => {
        this.setState({ selectedDate: date });
    }

    render = () => {
        const { date, maxDate, selectedDate } = this.state;

        return (
            <div className="flex flex-col items-center">
                <button className="bg-sky-600 text-white">UPCOMING AND PAST</button>
                <Calendar onChange={this.setDate} value={selectedDate} minDate={date} maxDate={maxDate}/>
                <h1>Selected Date: {selectedDate.toLocaleDateString()}</h1>
                <Link to={`${encodeURIComponent(selectedDate.toLocaleDateString())}`} className="bg-sky-600 text-white">SELECT TIME</Link>
            </div>
        )
    }
}

export default Appointments;