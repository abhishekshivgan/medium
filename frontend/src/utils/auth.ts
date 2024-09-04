import axios from "axios";
import { BACKEND_URL } from "../config";


export async function fetchUserData(token : string) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
            headers: {
                Authorization: token 
            }
        })

        if (response) {
            return response.data
        } else {
            return null
        }
    } catch (err) {
        return null;
    }
}