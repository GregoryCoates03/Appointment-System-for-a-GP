const DoctorHome = (props) => {
    const { doctor , user } = props;



    if (doctor) {
        return (
            <div className="flex flex-col items-center border-2">
                <h1 className="underline">Hello {user.first_name}</h1>
                <div className="grid grid-cols-1 text-center">
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center">
                <h1 className="text-red-500">ACCESS DENIED</h1>
            </div>
        )
    }

}

export default DoctorHome;