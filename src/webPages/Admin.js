import { Link } from "react-router-dom";

const admin = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className="underline">Admin Home</h1>
            <div className="grid grid-cols-1 text-center">
                <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/admin/create-doctor/">Add New Doctor</Link>
                <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/admin/update-doctor/">Update Doctor</Link>
                <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/admin/doctor-appointments/">Edit Doctor Appointments</Link>
                <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/admin/create-location/">Create Location</Link>
                <Link className="border-2 border-solid border-black my-2 bg-sky-600 text-white p-5" to="/admin/update-location/">Update Location</Link>
            </div>
        </div>
    )
}

export default admin;