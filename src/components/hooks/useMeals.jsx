// import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useMeals = () => {
    const axiosPublic = useAxiosPublic();
    
    const queryKey = ['meals'];

    const { data: meals = [], isLoading: loading, refetch } = useQuery({
        queryKey,
        queryFn: async () => {
            const res = await axiosPublic.get('/meals');
            return res.data;
        }
    });

    return [meals, loading, refetch, queryKey];
}

export default useMeals;
