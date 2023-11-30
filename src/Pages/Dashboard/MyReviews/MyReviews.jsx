import { FaEye, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import useReviews from "../../../components/hooks/useReviews";
import useAuth from "../../../components/hooks/useAuth";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useMeals from "../../../components/hooks/useMeals";

const MyReviews = () => {
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = useReviews();
    const { user } = useAuth();
    const [isReviews, setIsReviews] = useState([]);
    const [isLiked, setIsLiked] = useState([]);
    const [meals] = useMeals();


    // Effect to filter liked meals based on user's email
    useEffect(() => {
        const findReviewEmail = meals.filter((cartItem) => cartItem?.email === user?.email);
        setIsLiked(findReviewEmail);
    }, [meals, user?.email]);

    // Function to count user likes for a specific meal title
    const countUserReviews2 = (mealTitle) => {
        const filtered = isLiked?.filter((review) => review?.mealTitle === mealTitle);
        return filtered.length;
    };

    useEffect(() => {
        const findReviewEmail = cart.filter((cartItem) => cartItem?.email === user?.email);
        setIsReviews(findReviewEmail);
    }, [cart, user?.email]);

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requestMeals/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    const countUserReviews = (mealTitle) => {
        const filtered = isReviews?.filter((review) => review?.mealTitle === mealTitle);
        return filtered.length; // Return the count of reviews for the specified meal title
    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | My Reviews</title>
            </Helmet>
            <HeaderTitles heading={"My Reviews"}></HeaderTitles>
            <div className="overflow-x-auto">
                <table className=" w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Review Count</th>
                            <th>View Meal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {isReviews.map((item, index) => (
                            <tr key={item._id}>
                                <th className="">{index + 1}</th>
                                <td>{item.mealTitle}</td>
                                <td>{countUserReviews2(item?.likes)}</td>
                                <td>{countUserReviews(item?.mealTitle)}</td>
                                <td>
                                    <div className="flex items-center justify-center w-full">
                                        <Link to={`/mealsDetails/${item.mealId}`}><FaEye className="text-orange-500"></FaEye></Link>
                                    </div>
                                </td>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost hover:bg-transparent"
                                    >
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyReviews;
