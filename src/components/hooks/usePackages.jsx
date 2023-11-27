// api, axios (axios secure), tan stack 
import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePackages = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { refetch, data: packages = [] } = useQuery({
        queryKey: ['packages', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/packages?email=${user?.email}`);
            return res.data;
        }
    })

    return [packages, refetch]
};

export default usePackages;
