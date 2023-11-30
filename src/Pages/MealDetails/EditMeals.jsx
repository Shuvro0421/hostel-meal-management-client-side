
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../components/hooks/useAxiosSecure";

import HeaderTitles from "../HeaderTitles/HeaderTitles";



const EditMeals = () => {

    const axiosSecure = useAxiosSecure()
    const {
        mealTitle,
        mealImage,
        name,
        email,
        description,
        ingredients,
        rating,
        _id,
        price,
    } = useLoaderData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        // Extract form values
        const mealTitle = form.mealTitle.value;
        const mealImage = form.mealImage.value;
        const name = form.name.value;
        const email = form.email.value;
        const description = form.description.value;
        const ingredients = form.ingredients.value;
        const rating = form.rating.value;
        const price = form.price.value;

        // Prepare the data to send to the server
        const menuItem = {
            mealTitle,
            mealImage,
            name,
            email,
            description,
            ingredients,
            rating,
            price: parseFloat(price)
        };

        try {
            // Send the menu item data to the server with the image URL
            const menuRes = await axiosSecure.patch(`/meals/${_id}`, menuItem);
            console.log(menuRes.data);

            if (menuRes.data.modifiedCount > 0) {
                // Show success popup
                // You should use the correct data object to display the success message
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error updating menu item:", error);
        }
    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | Edit Meals</title>
            </Helmet>
            <HeaderTitles heading={'Edit Meals'}></HeaderTitles>
            <form onSubmit={handleSubmit} className="flex  flex-col gap-3">
                <input type="text" className="input input-bordered w-full " name="mealTitle" defaultValue={mealTitle} />
                <input type="text" className="input input-bordered w-full " name="mealImage" defaultValue={mealImage} />
                <input type="text" className="input input-bordered w-full " name="name" defaultValue={name} />
                <input type="text" className="input input-bordered w-full " name="email" defaultValue={email} />
                <textarea
                    name="description"
                    className="input thin-scrollbar input-bordered w-full "
                    defaultValue={description}
                ></textarea>
                <input className="input input-bordered w-full " type="text" name="ingredients" defaultValue={ingredients} />
                <input className="input input-bordered w-full " type="text" name="rating" defaultValue={rating} />
                <input className="input input-bordered w-full " type="number" name="price" defaultValue={price} />
                <input className="btn btn-outline w-full btn-warning " type="submit" value="edit" />
            </form>
        </div>
    );
};

export default EditMeals;
