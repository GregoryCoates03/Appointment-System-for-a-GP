const UpdateLocation = (props) => {
    const { admin } = props;

    if (admin) {
        return (
            <div className="flex flex-col items-center">
                <h1>Update Location</h1>
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

export default UpdateLocation;