import axios from "axios";
axios.defaults.withCredentials = true;
// https://axios-http.com/docs/intro

/*const getUser = (userID) => {
    axios.get(`${process.env.REACT_APP_SERVER}/api/users/11${userID}`).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    }); //.finally(() => {});
}*/

const createAccount = (userDetails) => {
    //console.log(userDetails);
    var emailExists = false;
    return axios.post(`${process.env.REACT_APP_SERVER}/api/exists/`, { email: userDetails.email }).then((response) => {
        //console.log(response.data);
        if(response.data.exists){
            return true;
        }    
        if (!emailExists){
            axios.post(`${process.env.REACT_APP_SERVER}/api/users/`, userDetails).then((response) => {
                return false;
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
}

const signInUser = async (email, password) => {
    console.log(process.env.REACT_APP_SERVER);
    console.log(`${process.env.REACT_APP_SERVER}/api/login/`)
    try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER}/api/login/`, { email, password });
        if(response.status === 200){
            const authenticated = await isAuthenticated();
            if (authenticated){
                console.log(response.data.user);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

const isAuthenticated  = async () => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/signed-in/`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
    /*    console.log(response.data);
        //console.log(response);
    } catch(error) {
        console.log(error);
    }*/
}

const getUser = () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/signed-in/`).then((response) => {
        //console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
}

const logOutUser = () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/log-out`).then((response) => {
        window.location.href = "http://localhost:3000/";
    }).catch((error) => {
        console.log(error);
    })
    //console.log("aaaaaaaa")
}

const getLocations = () => {
    return axios.get(`${process.env.REACT_APP_SERVER}/api/locations`).then((response) => {
        //console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
}

const updateDoctor = (details) => {
    return axios.put(`${process.env.REACT_APP_SERVER}/api/doctors/${details.doctor_id}`, details).then((response) => { 
        //console.log(response);
        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    });
}

const updateAccount = (details) => {
    //var emailExists = false;
    //console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    return axios.post(`${process.env.REACT_APP_SERVER}/api/exists/`, { email: details.email, user_id: details.user_id }).then((response) => {
        console.log(response);
        if(response.data.exists){
            //console.log("bbbbbbbbbb")
            //emailExists = true;
            return true;
        } else {
            //console.log("aaaaaaaaa")
            return axios.put(`${process.env.REACT_APP_SERVER}/api/users/${details.user_id}`, details).then((response) => {
                console.log(response.data);
                return false;
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
}

const updateLocation = (details) => {
    //console.log(details)
    return axios.put(`${process.env.REACT_APP_SERVER}/api/locations/${details.selectedLocation}`, {location_name: details.locationName}).then((response) => {
        console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error);
        return false;
    });
}

export {/*getUser,*/ createAccount, signInUser, isAuthenticated, getUser, logOutUser, getLocations, updateDoctor, updateAccount, updateLocation };

