

// import { useEffect, useState } from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";



const useRequestMeals = () => {
    const axiosPublic = useAxiosPublic();
    const {data: requestMeals = [], isPending: loading, refetch} = useQuery({
        queryKey: ['requestMeals'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/requestMeals');
            return res.data;
        }
    })


    return [requestMeals, loading, refetch]
}

export default useRequestMeals;