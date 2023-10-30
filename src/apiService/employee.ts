import axios from "axios";

const url = process.env.REACT_APP_BASE_URL;

// get list customer
export const getListEmployee = async() =>{
    try {
        const response = await axios.get(`${url}/employees`)
        return response?.data;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch user data");
    }
}

