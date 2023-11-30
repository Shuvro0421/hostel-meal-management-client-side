import axios from "axios";


export const axiosPublic = axios.create({
    baseURL: 'https://hostel-meal-management-server-side.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;