import axios from "axios";
// https://axios-http.com/docs/intro

const getUser = (userID) => {
    axios.get(`http://localhost:3001/api/users/11${userID}`).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    }); //.finally(() => {});
}

const createAccount = (userDetails) => {
    console.log(userDetails);
    var emailExists = false;
    return axios.get(`http://localhost:3001/api/users/`, { params: { email: userDetails.email }}).then((response) => {
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

export {getUser, createAccount};

