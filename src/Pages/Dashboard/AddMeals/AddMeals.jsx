import moment from "moment/moment";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";

import Swal from "sweetalert2";
import useAuth from "../../../components/hooks/useAuth";

import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";



const AddItems = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const { user } = useAuth()
    let likes = 0
    let reviews = 0
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        const currentDate = moment().format('YYYY-MM-DD');
        const currentTime = moment().format('HH:mm');

        // now send the menu item data to the server with the image url
        const menuItem = {
            mealTitle: data.mealTitle,
            mealType: data.mealType,
            mealImage: data.mealImage,
            ingredients: data.ingredients,
            description: data.description,
            price: parseFloat(data.price),
            rating: data.rating,
            recipe: data.recipe,
            date: currentDate,
            time: currentTime,
            name: data.name,
            email: user.email,
            mealStatus: data.mealStatus, // 'add meal' or 'upcoming'
            likes: parseInt(likes),
            reviews: parseInt(reviews)

        }
        const endpoint = data?.mealStatus === 'add meal' ? '/meals' : '/upcoming';
        const MealRes = await axiosSecure.post(endpoint, menuItem);
        console.log(MealRes.data)
        if (MealRes.data.insertedId) {
            // show success popup
            reset();
            const successMessage =
                data.mealStatus === 'add meal'
                    ? `${data.mealTitle} is added to the meals.`
                    : `${data.mealTitle} is added to upcoming meals.`;
            Swal.fire({
                position: "center",
                icon: "success",
                title: successMessage,
                showConfirmButton: false,
                timer: 1500
            });
        }

    };

    const handleButtonClick = (mealStatus) => {
        setValue('mealStatus', mealStatus);
        handleSubmit(onSubmit)();
    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | Add Meals</title>
            </Helmet>
            <HeaderTitles heading={'Add Meals'}></HeaderTitles>
            <div className=" drop-shadow-lg">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Meal Title*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Meal Name"
                            {...register('mealTitle', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex flex-col">
                        {/* category */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue="default" {...register('mealType', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="breakfast">Breakfast</option>
                                <option value="lunch">Lunch</option>
                                <option value="dinner">Dinner</option>
                            </select>
                        </div>

                        {/* Meal Image */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Meal Image URL*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Meal Image"
                                {...register('mealImage', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>


                        {/* ingredients */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Ingredients*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Ingredients"
                                {...register('ingredients', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>

                        {/* meal details */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Meal Description</span>
                            </label>
                            <textarea {...register('description')} className="textarea textarea-bordered h-24" placeholder="Description"></textarea>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                        {/* rating */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Rating*</span>
                            </label>
                            <input
                                type="text" // Change the input type to text
                                placeholder="Rating"
                                {...register('rating', { required: true, pattern: /^[0-9]*[.]?[0-9]*$/ })}
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* Name */}
                        <div className="form-control w-full my-2">
                            <label className="label">
                                <span className="label-text">Name*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register('name', { required: true })}
                                required
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    <div className="space-y-5">
                        <button
                            type="button"
                            onClick={() => handleButtonClick('add meal')}
                            className="btn w-full btn-outline btn-warning"
                        >
                            Add Item <FaUtensils className="ml-4"></FaUtensils>
                        </button>
                        <button
                            type="button"
                            onClick={() => handleButtonClick('upcoming')}
                            className="btn w-full btn-warning"
                        >
                            Add to Upcoming <FaUtensils className="ml-4"></FaUtensils>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItems;