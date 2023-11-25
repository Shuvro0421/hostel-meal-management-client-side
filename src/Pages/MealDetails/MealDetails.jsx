import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import { IoFastFood, IoFastFoodOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../components/hooks/useAxiosPublic";
import useRequestMeals from "../../components/hooks/useRequestMeals";
import Swal from "sweetalert2";
import HeaderTitles from "../HeaderTitles/HeaderTitles";
import useReviews from "../../components/hooks/useReviews";



const MealDetails = () => {
    const [, refetch] = useRequestMeals()
    const [success, setSuccess] = useState('')
    const [reviews] = useReviews()
    
    const {
        mealTitle,
        mealImage,
        distributorName,
        distributorEmail,
        description,
        ingredients,
        time,
        rating,
        _id,
     

    } = useLoaderData();

    const ingredientList = ingredients.split(',').map((ingredient, index) => (
        <li key={index} className="font-semibold py-1">
            {ingredient.trim()}
        </li>
    ));

    const [isClicked, setIsClicked] = useState(false);


    useEffect(() => {
        const isLiked = localStorage.getItem(`like_${_id}`);
        setIsClicked(isLiked === "true");
    }, [_id]);

    const handleIsClicked = async () => {
        try {
            console.log("Before: isClicked", isClicked);

            // Use the functional form of setState to update based on the previous state
            await axiosPublic.put(`/meals/${_id}`);
            setIsClicked((prevIsClicked) => !prevIsClicked);

            // Save the like state in localStorage
            localStorage.setItem(`like_${_id}`, String(!isClicked));

            console.log("After: isClicked", isClicked);
        } catch (error) {
            console.error("Error updating likes:", error.message);
        }
    };

    const axiosPublic = useAxiosPublic()

    const handleRequestMeals = async () => {
        try {
            await axiosPublic.post("/requestMeals", {
                mealTitle,
                mealImage,
                distributorName,
                distributorEmail,
                // Add other data you want to send with the request
            }).then(res => {
                console.log(res.data);
                if (res.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `Request has been added`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
                // refetch the cart
                refetch();
                console.log('Refetch completed'); // Add this log
            });
            // Optionally, you can update the UI or show a success message here
        } catch (error) {
            console.error("Error requesting meal:", error.message);
            // Handle the error, display a user-friendly message, or log it as needed
        }
    };
    const handleReviews = (e) => {
        e.preventDefault()
        const form = e.target
        const reviews = form.reviews.value

        try {
            setSuccess('')
            axiosPublic.post(`/reviews`, {
                distributorName,
                distributorEmail,
                reviews,
                mealTitle
                // Add other data you want to send with the request
            }).then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    setSuccess('Reviewed this meal!')
                    form.reset()
                }
                refetch()
            })
            // Optionally, you can update the UI or show a success message here
        } catch (error) {
            console.error("Error requesting meal:", error.message);
            // Handle the error, display a user-friendly message, or log it as needed
        }
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
                        <div className="flex justify-between items-center">
                            <p className="py-3 font-semibold">
                                <span className="text-orange-500">
                                    Added by:{" "}
                                </span>
                                {distributorName}
                            </p>
                            <p className="py-3 font-semibold">
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
                            <div className="flex justify-center items-center gap-2">
                                <button onClick={handleIsClicked} className="btn">
                                    {isClicked ? (
                                        <>
                                            <IoFastFood className="text-2xl text-orange-500" />
                                            Unlike
                                        </>
                                    ) : (
                                        <>
                                            <IoFastFoodOutline className="text-2xl text-orange-500" />
                                            Like
                                        </>
                                    )}
                                </button>
                            </div>

                            <button
                                onClick={handleRequestMeals}
                                className="btn btn-outline border-orange-500 hover:bg-orange-500 border-2 hover:border-orange-500 text-orange-500 hover:text-black merienda"
                            >
                                Request this meal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <HeaderTitles heading={'Reviews'}></HeaderTitles>
                </div>
                <div className="h-72 overflow-auto border-2 m-2 thin-scrollbar">
                    {
                        reviews
                            .filter(review => review.mealTitle === mealTitle) // Replace 'desiredMealTitle' with the meal title you want to filter
                            .map(review => (
                                <div key={review._id}>
                                    <div className="border border-orange-500  my-2 m-3 p-3 rounded-lg text-center">
                                        <h1 >{review.reviews}</h1>
                                        <h1 className="text-left merienda text-xs text-orange-500">~{review.distributorName}</h1>
                                    </div>
                                </div>
                            ))
                    }
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
                        <input type="submit" className='btn btn-outline hover:bg-yellow-400 hover:border-yellow-400 text-yellow-400 font-semibold hover:text-black merienda normal-case w-full' value="Submit review" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;
