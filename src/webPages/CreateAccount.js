import React from "react";
import { Link } from "react-router-dom";
import { createAccount } from "../databaseInteraction";

class CreateAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            family_name: "",
            email: "",
            confirm_email: "",
            phone_number: "",
            address: "",
            password: "",
            confirm_password: "",
            preferred_doctors: ""
        };
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({[name]: value});
        console.log(name, value);
    }
    
    handleSubmit = () => {
        const { first_name, family_name, email, confirm_email, phone_number, address, password, confirm_password, preferred_doctors } = this.state;
        let email_same = false;
        let password_same = false;

        if (email === confirm_email) {
            email_same = true;
        }

        if (password === confirm_password){
            password_same = true;
        }

        if (email_same && password_same){
            createAccount({
                first_name,
                family_name,
                email,
                phone_number,
                address,
                password,
                preferred_doctors
            });
        }
    }

    render = () => {
        return (
            <div className="flex items-center flex-col border-2"> 
                <Link to={'/sign-in/'}>Sign-In</Link>
                <h1>Create Account</h1>
                <form className="flex flex-col" onSubmit={this.handleSubmit}>
                    <label htmlFor="first_name">First Name:</label>
                    <input id="first_name" name="first_name" type="text" className="bg-gray-400" value={this.state.first_name} onChange={this.handleChange} />
                    <label htmlFor="family_name">Family Name:</label>
                    <input id="family_name" name="family_name" type="text" className="bg-gray-400" value={this.state.family_name} onChange={this.handleChange} />
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" className="bg-gray-400" value={this.state.email} onChange={this.handleChange} />
                    <label htmlFor="confirm_email">Confirm Email:</label>
                    <input id="confirm_email" name="confirm_email" type="email" className="bg-gray-400" value={this.state.confirm_email} onChange={this.handleChange} />
                    <label htmlFor="phone_number">Phone Number e.g. 123-456-789:</label>
                    <input id="phone_number" name="phone_number" type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}" className="bg-gray-400" value={this.state.phone_number} onChange={this.handleChange}/>
                    <label htmlFor="address">Address:</label>
                    <input id="address" name="address" type="text" className="bg-gray-400" value={this.state.address} onChange={this.handleChange}/>
                    <label htmlFor="password">Password:</label>
                    <input id="password" name="password" type="password" className="bg-gray-400" value={this.state.password} onChange={this.handleChange}/>
                    <label htmlFor="confirm_password">Confirm Password:</label>
                    <input id="confirm_password" name="confirm_password" type="password" className="bg-gray-400" value={this.state.confirm_password} onChange={this.handleChange}/>
                    <label htmlFor="preferred_doctors">Preferred Doctors:</label>
                    <input id="preferred_doctors" name="preferred_doctors" type="text" className="bg-gray-400" onChange={this.handleChange}/>
                    <button type="submit" className="text-lime-500">Create Account</button>
                </form>
            </div>
        )
    }
}

export default CreateAccount;