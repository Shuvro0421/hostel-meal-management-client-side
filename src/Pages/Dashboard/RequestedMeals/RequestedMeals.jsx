

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import useRequestMeals from "../../../components/hooks/useRequestMeals";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import useAuth from "../../../components/hooks/useAuth";
import useMeals from "../../../components/hooks/useMeals";


// ... (your existing imports)

const RequestedMeals = () => {
    const [cart, refetch] = useRequestMeals();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [isReviews, setIsReviews] = useState([]);
    const [isLiked, setIsLiked] = useState([]);
    const [meals] = useMeals();

    // Effect to filter reviews based on user's email
    useEffect(() => {
        const findReviewEmail = cart.filter((cartItem) => cartItem?.email === user?.email);
        setIsReviews(findReviewEmail);
    }, [cart, user?.email]);

    // Function to count user reviews for a specific meal title
    const countUserReviews = (mealTitle) => {
        const filtered = isReviews?.filter((review) => review?.mealTitle === mealTitle);
        return filtered.length;
    };

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

    // Function to handle meal deletion
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/requestMeals/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    };

    // Sort the cart based on the "pending" status
    const sortedCart = cart.slice().sort((a, b) => {
        // Assuming that "status" is a string representing the status
        return b.status.localeCompare(a.status);
    });

    return (
        <div>
            <Helmet>
                <title>Meal Management | Requested Meals</title>
            </Helmet>
            <HeaderTitles heading={'Requested Meals'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: ${totalPrice}</h2>
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-outline btn-warning">Pay</button>
                </Link> :
                    <button disabled className="btn btn-primary">Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Likes</th>
                            <th>Reviews</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            sortedCart.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td className="flex items-center mt-2 justify-center">
                                        <div className="">
                                            <div>
                                                <div className="">
                                                    <img className="w-10 h-10 border-2 border-yellow-400 rounded-lg" src={item.mealImage} alt={item.mealTitle} />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.mealTitle}</td>
                                    <td>${item.price}</td>
                                    <td>{item.status}</td>
                                    <td>{countUserReviews2(item?.likes)}</td>
                                    <td>{countUserReviews(item?.mealTitle)}</td>
                                    <th>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="btn btn-ghost hover:bg-transparent"
                                        >
                                            <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestedMeals;
