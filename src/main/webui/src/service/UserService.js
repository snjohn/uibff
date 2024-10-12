import axios from 'axios';
import { format } from 'react-string-format';
import apiClient from "./ApiHelper"

export default class UserService {
    getUsersLocal() {
       // return axios.get('assets/demo/data/users.json')
        return axios.get('/user/all')
        .then((res) => res.data.data)
        .catch((error) => {
            if(error.response) {
                console.error('Server Error: ', error.response.status);
            } else if(error.request) {
                console.error('Network Error: ', error.request);
            } else {
                console.error('Error: ', error.message);
            }
        });
    }

    getUsersRemote() {
        return axios.get("/user/remote/all")
        .then((res) => res.data.data)
        .catch((error) => {
            if(error.response) {
                console.error('Server Error: ', error.response.status);
            } else if(error.request) {
                console.error('Network Error: ', error.request);
            } else {
                console.error('Error: ', error.message);
            }
        });
    }
    /*
    getUsersRemote(currPage, pageSize) {
        return axios.get(format('https://api.example.com/items?page={0}&size={1}',currPage,pageSize));
    }
    */
    updateUser(id, user) {
        //return axios.put(format('https://api.example.com/users/{0}',id), user);
        console.log("Updating user: "+user);

    }

    createUser(newUser) {
        //return axios.post('https://api.example.com/users', newUser);
        console.log("Creating user: "+newUser);
    }
}
