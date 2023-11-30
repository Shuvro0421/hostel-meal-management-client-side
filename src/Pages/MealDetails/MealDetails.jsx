import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { IoFastFood, IoFastFoodOutline } from "react-icons/io5";
import { useState } from "react";

import Swal from "sweetalert2";
import HeaderTitles from "../HeaderTitles/HeaderTitles";
import useReviews from "../../components/hooks/useReviews";
import useRequestMeals from "../../components/hooks/useRequestMeals";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";
import useAuth from "../../components/hooks/useAuth";
import { useEffect } from "react";






const MealDetails = () => {

    const [success, setSuccess] = useState('')
    const [reviews, refetchAgain] = useReviews();
    const [, refetch] = useRequestMeals()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [error, setError] = useState('')
    const [error2, setError2] = useState('')
    const [premiumUser, setPremiumUser] = useState([])
    const [normalUser, setNormalUSer] = useState([])
    const [isLiked, setIsLiked] = useState(false)


    const {
        mealTitle,
        mealImage,
        name,
        description,
        ingredients,
        time,
        rating,
        _id,
        price,
        likes


    } = useLoaderData();

    const handleClicked = () => {
        setIsLiked(!isLiked)
    }

    useEffect(() => {
        fetch('https://hostel-meal-management-server-side.vercel.app/packagePayments')
            .then(res => res.json())
            .then(data => setNormalUSer(data))
    }, [])

    useEffect(() => {
        const isUserPremium = normalUser.find(normal => normal?.email === user?.email)
        setPremiumUser(isUserPremium)
    }, [normalUser, user?.email])

    const ingredientList = ingredients?.split(',')?.map((ingredient, index) => (
        <li key={index} className="font-semibold py-1">
            {ingredient?.trim()}
        </li>
    ));
    const handleRequestMeals = async () => {
        setError('')
        if (user && user.email) {
            await axiosSecure.post("/requestMeals", {
                mealTitle,
                mealImage,
                name: user.displayName,
                email: user.email,
                mealId: _id,
                price,
                status: 'pending',



                // Add other data you want to send with the request
            }).then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `Request has been added`,
                        showConfirmButton: false,
                        timer: 1500,
                    });

                }
                refetch()
            });
        }
        else {
            setError('Need to login first')
        }
        // Optionally, you can update the UI or show a success message here
    }

    const handleLike = async () => {
        // Call the endpoint to like the meal
        await axiosSecure.post(`/meals/like/${_id}`);
        // Optionally, you can update the UI or show a success message here

    };

    const handleDislike = async () => {
        // Call the endpoint to dislike the meal
        await axiosSecure.post(`/meals/dislike/${_id}`);
        // Optionally, you can update the UI or show a success message here

    };

    const handleReviews = async (e) => {
        e.preventDefault()
        const form = e.target
        const reviews = form.reviews.value
        setSuccess('')
        setError('')
        if (user && user.email) {
            await axiosSecure.post(`/reviews`, {
                name: user.displayName,
                email: user.email,
                reviews,
                mealTitle,
                mealId: _id
                // Add other data you want to send with the request
            }).then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    setSuccess('Reviewed this meal!')
                    form.reset()
                }
                refetchAgain()

            })
        }
        else {
            setError2('Need to login first')
        }
        // Optionally, you can update the UI or show a success message here

    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | Details</title>
            </Helmet>
            <div className="hero my-10">
                <div className="hero-content flex-col lg:flex-row">
                    <img
                        src={mealImage}
                        className="max-w-md w-60 md:w-96 rounded-lg shadow-2xl"
                        alt={mealTitle}
                    />
                    <div>
                        <h1 className="md:text-5xl text-2xl w-full font-bold md:text-left text-center merienda text-orange-500">
                            {mealTitle}
                        </h1>
                        <div className="flex  md:flex-row flex-col md:justify-between md:items-center">
                            <p className="py-3  font-semibold">
                                <span className="text-orange-500">
                                    Added by:{" "}
                                </span>
                                {name}
                            </p>
                            <p className="py-3  font-semibold">
                                <span className="text-orange-500">
                                    Posted at:{" "}
                                </span>
                                {time}
                            </p>
                        </div>
                        <div className="h-40 overflow-auto thin-scrollbar border-2 p-2 rounded-lg">
                            <p className="py-2 font-semibold">
                                <span className="text-orange-500">
                                    About meal:{" "}
                                </span>{" "}
                                <br /> {description}
                            </p>
                            <p className="py-2 font-semibold">
                                <span className="text-orange-500">
                                    Ingredients:{" "}
                                </span>
                            </p>
                            <ul>{ingredientList}</ul>
                        </div>
                        <div className="flex md:flex-row mt-5 flex-col gap-3 md:gap-5 items-center justify-between w-full">
                            <p className="merienda text-orange-500">
                                Rating: {rating}/5
                            </p>
                            <div>
                                <div onClick={handleClicked} className="flex justify-center items-center gap-2">

                                    <button className="btn" onClick={handleLike}>
                                        <>
                                            <IoFastFood className="text-2xl text-orange-500" />
                                            Like
                                        </>
                                    </button>

                                    <button className="btn" onClick={handleDislike}>
                                        <>
                                            <IoFastFoodOutline className="text-2xl text-orange-500" />
                                            Dislike
                                        </>
                                    </button>


                                    :

                                    <p className="text-orange-500 font-semibold">liked by: {likes} people</p>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {
                                    premiumUser ?
                                        <button
                                            onClick={handleRequestMeals}
                                            className="btn btn-outline border-orange-500 hover:bg-orange-500 border-2 hover:border-orange-500 text-orange-500 hover:text-black merienda"
                                        >
                                            Request this meal
                                        </button>
                                        :
                                        <p className="text-orange-500 font-semibold">Need to buy the package</p>
                                }

                                <p className='text-orange-500 text-sm font-semibold text-left'>{error}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <HeaderTitles heading={'Reviews'}></HeaderTitles>
                </div>
                <div className="h-72 overflow-auto border-2 m-2 thin-scrollbar">
                    {reviews
                        .filter(review => review.mealTitle === mealTitle)
                        .map(review => (
                            <div key={review._id}>
                                <div className="border border-orange-500 my-2 m-3 p-3 rounded-lg text-center">
                                    <h1>{review.reviews}</h1>
                                    <h1 className="text-left merienda text-xs text-orange-500">~{review.name}</h1>
                                </div>
                            </div>
                        ))}

                    {reviews.filter(review => review.mealTitle === mealTitle).length === 0 && (
                        <div className="text-center text-orange-400">No reviews available.</div>
                    )}
                </div>


            </div>
            <div>
                <div>
                    <HeaderTitles heading={'Give your reviews'}></HeaderTitles>
                </div>
                <div className="m-5">
                    <form onSubmit={handleReviews}>
                        <textarea name="reviews" className="textarea textarea-bordered w-full" placeholder="your review"></textarea>
                        <p className='text-yellow-400 text-sm font-semibold text-left'>{success}</p>
                        <p className='text-yellow-400 text-sm font-semibold text-left'>{error2}</p>
                        <input type="submit" className='btn btn-outline hover:bg-yellow-400 hover:border-yellow-400 text-yellow-400 font-semibold hover:text-black merienda normal-case w-full' value="Submit review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
