// api, axios (axios secure), tan stack 

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { user} = useAuth();
    const { refetch, data: reviews = [] } = useQuery({
        queryKey: ['reviews', user?.email],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
            return res.data;
        }
    })

    return [reviews, refetch]
};

export default useReviews;