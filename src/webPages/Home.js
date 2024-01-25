import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../databaseInteraction";
import { getUser } from "../databaseInteraction";

const Home = () => {
    const [user, setUser] = useState(null);

    const handleGetUser = async () => {
        try {
            const userData = await getUser().then((response) => {
                console.log("bbbbbbbbbbb")
                console.log(response);
                return response.user;
            });
            setUser(userData);
            console.log("aaaaaaaaaaa")
            console.log(userData)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>{`Hello ${user ? user.first_name : ''}`}</h1>
            <button onClick={handleGetUser}>Get Name</button>
        </div>
    )
}

export default Home;