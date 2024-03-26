import { useState } from "react";
import axios from "axios";

const UpdateRisk = (props) => {
    const { admin } = props;

    const [email, setEmail] = useState("");
    const [risk, setRisk] = useState(false);

    const handleSubmit = async () => {

    }

    const handleChange = (event) => {
        
    }

    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Update Risk</h1>
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <label htmlFor="email">User Email:</label>
                    <input id="email" name="email" type="text" className="bg-gray-400" value={email} onChange={handleChange}/>
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