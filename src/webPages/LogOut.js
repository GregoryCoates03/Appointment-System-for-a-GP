import React from "react";
import { Link } from "react-router-dom";
import { logOutUser } from "../databaseInteraction";

class LogOut extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick = () => {
        logOutUser();
        this.props.setSignedIn(false);
    }

    render = () => {
        return (
            <div className="flex items-center flex-col border-2"> 
                <button onClick={this.handleClick}>Log Out</button>
            </div>
        )
    }
}

export default LogOut;