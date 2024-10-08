import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../databaseInteraction";
import { getUser } from "../databaseInteraction";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Home = (props) => {
    const { signedIn } = props;
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const loc = useLocation();

    const handleGetUser = async () => {
        try {
            const userData = await getUser().then((response) => {
                //console.log("bbbbbbbbbbb")
                //console.log(response);
                return response.user;
            });
            if (userData !== undefined){
                setUser(userData);
            }
            //console.log("aaaaaaaaaaa")
            //console.log(userData)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (!signedIn) {
            navigate('/sign-in', { state: { prev: loc.pathname }});
        }
        handleGetUser();
    }, []);

    if (user) {
        return (
            <div className="flex flex-col items-center">
                <h1 className="underline">Hello {user.first_name}</h1>
                <div className="grid grid-cols-1 text-center">
                        <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/appointments/">View Appointments</Link>
                        <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/information/">Update Information</Link>
                    </div>
            </div>
        )
    }
}

export default Home;