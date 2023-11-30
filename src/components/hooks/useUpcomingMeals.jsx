// api, axios (axios secure), tan stack 
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUpcomingMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: upcomingMeals = [] } = useQuery({
        queryKey: ['upcomingMeals', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcoming?email=${user?.email}`);
            return res.data;
        }
    })

    return [upcomingMeals, refetch]
};

export default useUpcomingMeals;
