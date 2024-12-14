import axios from "./axiosConfig";
import { apiDomain } from "./constants";


export const getUser = async () => {
    try {
        const response = await axios.get(apiDomain + '/auth/user');
        return response.data.user;
    }
    catch (err) {
        console.log(err);
        throw err;
    }

}


export const loginUser = async (username: string, password:string) => {
    try {
        const response = await axios.post(apiDomain + '/auth/login', { username, password });
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

export const logoutUser = async () => {
    try {
        const response = await axios.post(apiDomain + '/auth/logout');
        return response.data;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
}