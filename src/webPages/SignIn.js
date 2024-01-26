import React from "react";
import { Link } from "react-router-dom";
import { signInUser } from "../databaseInteraction";

class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = this.state;

        signInUser(email, password).then((response) => {
            console.log(response);
            this.props.setSignedIn(true);
        }).catch((error) => {
            console.log(error);
        });
    }

    render = () => {
        return (
            <div className="flex items-center flex-col border-2"> 
                <Link to={'/create-account/'}>Create Account</Link>
                <h1>Sign-In</h1>
                <form className="flex flex-col" onSubmit={this.handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" className="bg-gray-400" onChange={this.handleChange}/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" className="bg-gray-400" onChange={this.handleChange}/>
                    <button type="submit" className="text-lime-500">Sign-In</button>
                </form>
            </div>
        )
    }
}

export default SignIn;