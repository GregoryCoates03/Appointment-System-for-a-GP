import { Link } from "react-router-dom";

const admin = () => {
    return (
        <div className="flex flex-col items-center">
            <h1>Admin Home</h1>
            <Link to="/admin/create-doctor/">Add New Doctor</Link>
            <Link to="/admin/update-doctor/">Update Doctor</Link>
            <Link to="/admin/doctor-appointments/">Edit Doctor Appointments</Link>
            <Link to="/admin/create-location/">Create Location</Link>
            <Link to="/admin/update-location/">Update Location</Link>
        </div>
    )
}

export default admin;