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
    axios.post(`http://localhost:3001/api/users/`, userDetails).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.log(error);
    });
}

export {getUser, createAccount};

