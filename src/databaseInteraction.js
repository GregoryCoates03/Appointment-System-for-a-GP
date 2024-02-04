import axios from "axios";
axios.defaults.withCredentials = true;
// https://axios-http.com/docs/intro

/*const getUser = (userID) => {
    axios.get(`http://localhost:3001/api/users/11${userID}`).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    }); //.finally(() => {});
}*/

const createAccount = (userDetails) => {
    console.log(userDetails);
    var emailExists = false;
    return axios.post(`http://localhost:3001/api/exists/`, { email: userDetails.email }).then((response) => {
        console.log(response.data);
        if(response.data === "Email already exists"){
            emailExists = true;
            return emailExists;
        }    
        if (!emailExists){
            axios.post(`http://localhost:3001/api/users/`, userDetails).then((response) => {
                console.log(response.data);
                return emailExists;
            }).catch((error) => {
                console.log(error);
            });
        }
    }).catch((error) => {
        console.log(error);
    });
}

const signInUser = (email, password) => {
    return axios.post(`http://localhost:3001/api/login/`, { email, password }).then((response) => {
        if(response.status === 200){
            if (isAuthenticated()){
                console.log(response.data.user);
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }).catch((error) => {
        console.log(error);
        return false;
    })
}

const isAuthenticated  = () => {
    return axios.get(`http://localhost:3001/api/signed-in/`).then((response) => {
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
    /*    console.log(response.data);
        //console.log(response);
    } catch(error) {
        console.log(error);
    }*/
}

const getUser = () => {
    return axios.get(`http://localhost:3001/api/signed-in/`).then((response) => {
        console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
}

const logOutUser = () => {
    return axios.get(`http://localhost:3001/api/log-out`).then((response) => {
        window.location.href = "http://localhost:3000/";
    }).catch((error) => {
        console.log(error);
    })
    //console.log("aaaaaaaa")
}

const getLocations = () => {
    return axios.get(`http://localhost:3001/api/locations`).then((response) => {
        console.log(response.data);
        return response.data;
    }).catch((error) => {
        console.log(error);
    })
}

export {/*getUser,*/ createAccount, signInUser, isAuthenticated, getUser, logOutUser, getLocations };

