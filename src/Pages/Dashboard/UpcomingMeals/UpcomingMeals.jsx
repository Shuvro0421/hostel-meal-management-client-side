import { FaSpeakap } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import useReviews from "../../../components/hooks/useReviews";
import useUpcomingMeals from "../../../components/hooks/useUpcomingMeals";
import moment from "moment/moment";
import { Helmet } from "react-helmet-async";

const UpcomingMeals = () => {
    const [isUpcomingMeals, setIsUpcomingMeals] = useUpcomingMeals();
    const axiosSecure = useAxiosSecure();
    const [reviews] = useReviews();
    const [, refetch] = useUpcomingMeals()

    const handlePublishClick = async (mealId, mealTitle, likes, mealType, mealImage, ingredients,
        description, price, rating, name, email, mealStatus, reviews) => {
        const currentDate = moment().format('YYYY-MM-DD');
        const currentTime = moment().format('HH:mm');
        try {
            // Check if likes are less than or equal to 10
            if (likes <= 9) {
                // Show a warning message
                Swal.fire({
                    icon: 'warning',
                    title: 'Cannot Publish',
                    text: 'Must be 10 or more likes to publish',
                });
                return; // Do not proceed with publishing
            }

            // Send a POST request to /meals with the mealTitle
            await axiosSecure.post('/meals', {
                mealTitle,
                mealType,
                mealImage,
                ingredients,
                description,
                price: parseFloat(price),
                rating,
                date: currentDate,
                time: currentTime,
                name,
                email,
                mealStatus,
                likes: parseInt(likes),
                reviews: parseInt(reviews)

            });

            // Delete the meal from the upcomingMeals array
            const updatedUpcomingMeals = isUpcomingMeals.filter(item => item._id !== mealId);
            setIsUpcomingMeals(updatedUpcomingMeals); // Assuming setIsUpcomingMeals is a state setter function

            // Delete the meal from the /upcoming endpoint
            await axiosSecure.delete(`/upcoming/${mealId}`);

            // Show a success message
            Swal.fire({
                icon: 'success',
                title: 'Meal Published!',
                text: `Meal "${mealTitle}" has been published successfully.`,
            });

            // Manually trigger a refetch to update upcoming meals data
            refetch();
        } catch (error) {
            // Log error for debugging
            console.error('Error publishing meal:', error);

            // Show an error message
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to publish meal. Please try again later.',
            });
        }
    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | Upcoming Meals</title>
            </Helmet>
            <HeaderTitles heading={'Upcoming Meals'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {isUpcomingMeals.length}</h2>
            </div>
            <div className="overflow-x-auto md:text-sm text-xs">
                <table className="w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>#</th>
                            <th>Meal Title</th>
                            <th>Time</th>
                            <th>Likes</th>
                            <th>Total Reviews</th>

                            <th>Publish</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {isUpcomingMeals.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.mealTitle}</td>
                                <td>{item.time}</td>
                                <td>{item.likes}</td>
                                <td>{reviews.filter(review => review.mealTitle === item.mealTitle).length}</td>
                                <th>
                                    <button
                                        onClick={() => handlePublishClick(item._id, item.mealTitle, item.likes,
                                            item.mealType, item.mealImage, item.ingredients, item.description, item.price, item.rating,
                                            item.name, item.email, item.mealStatus, item.reviews)}
                                        className="btn btn-ghost hover:bg-transparent text-lg text-yellow-400"
                                    >
                                        <FaSpeakap />
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

export default UpcomingMeals;
