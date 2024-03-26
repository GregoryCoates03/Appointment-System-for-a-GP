import { useEffect, useState } from "react";
import axios from "axios";

const UpdateRisk = (props) => {
    const { admin } = props;

    const [email, setEmail] = useState("");
    const [risk, setRisk] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/risk`, { risk, email });
            console.log(response.data);
            const error = document.getElementById('error');
            if (response.data && (response.data[0].at_risk === risk)) {
                if (risk === true){
                    error.textContent = `Risk label added to user: ${email}`;
                } else {
                    error.textContent = `Risk label removed from user: ${email}`;
                }
                error.className = "text-green-500";
            } else {
                error.textContent = "ERROR";
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (event) => {
        setEmail(event.target.value);
    }

    const handleRisk = () => {
        setRisk(!risk);
    }

    useEffect(() => {
        console.log(risk);
    }, [risk])

    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Update Risk</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <label htmlFor="email">User Email:</label>
                    <input id="email" name="email" type="text" className="bg-gray-400" value={email} onChange={handleChange}/>
                    <label htmlFor="risk">Risk:</label>
                    <input id="risk" name="risk" type="checkbox" value={risk} onChange={handleRisk}/>
                    <button type="submit" className="text-lime-500">Update Risk</button>
                </form>
                <p id="error" className="text-red-500"></p>
            </div>
        )
    } else {
        return (
            <h1>A</h1>
        )
    }
}

export default UpdateRisk;