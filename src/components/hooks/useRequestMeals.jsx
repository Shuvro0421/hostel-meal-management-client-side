

// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
const useRequestMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: requestMeals = [] } = useQuery({
        queryKey: ['requestMeals', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/requestMeals?email=${user?.email}`);
            return res.data;
        }
    })

    return [requestMeals, refetch]
};

export default useRequestMeals;