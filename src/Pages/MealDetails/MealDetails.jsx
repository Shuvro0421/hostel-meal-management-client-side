import { Helmet } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import './MealDetails.css'
import { IoFastFood, IoFastFoodOutline } from "react-icons/io5";
import { useState } from "react";

const MealDetails = () => {
    const { mealTitle, mealImage, distributorName, description, ingredients, time, rating } = useLoaderData()
    const ingredientList = ingredients.split(',').map((ingredient, index) => (
        <li key={index} className="font-semibold py-1">{ingredient.trim()}</li>
    ));
    const [isClicked, setIsClicked] = useState(false)
    const handleIsClicked = () => {
        setIsClicked(!isClicked)
    }
    return (
        <div>
            <Helmet>
                <title>Meal Management | Details</title>
            </Helmet>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={mealImage} className="max-w-md w-60 md:w-96 rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="md:text-5xl text-2xl w-full font-bold md:text-left text-center merienda text-orange-500">{mealTitle}</h1>
                        <div className="flex justify-between  items-center">
                            <p className="py-3 font-semibold"><span className="text-orange-500">Added by: </span>{distributorName}</p>
                            <p className="py-3 font-semibold"><span className="text-orange-500">Posted at: </span>{time}</p>
                        </div>
                        <div className="h-40 overflow-auto thin-scrollbar border-2 p-2 rounded-lg">
                            <p className="py-2 font-semibold"><span className="text-orange-500">About meal: </span> <br /> {description}</p>
                            <p className="py-2 font-semibold"><span className="text-orange-500">Ingredients: </span></p>
                            <p>{ingredientList}</p>
                        </div>
                        <div className="flex md:flex-row mt-5 flex-col gap-3 md:gap-0 items-center justify-between w-full">
                            <p className="merienda text-orange-500">Rating: {rating}/5</p>
                            <div className="flex  justify-center items-center gap-2">
                            <p className="merienda text-orange-500">Like this meal:</p>
                                <button onClick={handleIsClicked} className="btn">{isClicked ? <IoFastFood className="text-2xl text-orange-500"></IoFastFood> : <IoFastFoodOutline className="text-2xl text-orange-500"></IoFastFoodOutline >}</button>
                            </div>
                            <Link to={``}>
                                <button className="btn btn-outline border-orange-500 hover:bg-orange-500 border-2 hover:border-orange-500 text-orange-500 hover:text-black merienda">Request this meal</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MealDetails;