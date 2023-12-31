// api, axios (axios secure), tan stack 
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: meals = [] } = useQuery({
        queryKey: ['meals', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?email=${user?.email}`);
            return res.data;
        }
    })

    return [meals, refetch]
};

export default useMeals;
