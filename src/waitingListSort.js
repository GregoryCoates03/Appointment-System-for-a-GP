import axios from "axios";
//const sendEmail = require("sendEmail");

export default class waitingList {
    constructor(location_id, doctor_id, date) {
        this.waitingList = [];
        this.date = date;
        this.doctor_id = doctor_id;
        this.location_id = location_id;
    }

    setWaitingList = async () => {
        const response = await axios.get(`${process.env.REACT_APP_SERVER}/api/check-waiting-list?date=${this.date}&doctor_id=${this.doctor_id}&location_id=${this.location_id}`);
        this.waitingList = response.data;
    }

    waitingListSort = async () => {
        await this.setWaitingList();
        const atRisk = this.waitingList.filter((item) => {
            return item.at_risk;
        });
    
        const notAtRisk = this.waitingList.filter((item) => {
            return !item.at_risk;
        });
    
        return [...this.sortFunction(atRisk), ...this.sortFunction(notAtRisk)];
    }
    
    sortFunction = (list) => {
        return list.sort((a,b) => {
            if (a.waiting_list_position === b.waiting_list_position){
                return a.waiting_list_id - b.waiting_list_id;
            } else {
                return b.waiting_list_position - a.waiting_list_position;
            }
        });
    }
}

/*const waiting_list = new waitingList("31-03-2024", 2, 1);
console.log(waiting_list.waitingListSort().then(sorted => console.log(sorted)));
*/
/*console.log(waitingListSort([{
    waiting_list_id: 10,
    user_id: 6,
    waiting_list_position: 2,
    at_risk: false
}, {
    waiting_list_id: 9,
    user_id: 6,
    waiting_list_position: 1,
    at_risk: true
}, {
    waiting_list_id: 8,
    user_id: 6,
    waiting_list_position: 2,
    at_risk: true
}, {
    waiting_list_id: 7,
    user_id: 6,
    waiting_list_position: 5,
    at_risk: false
}, {
    waiting_list_id: 6,
    user_id: 6,
    waiting_list_position: 1,
    at_risk: true
}]))*/