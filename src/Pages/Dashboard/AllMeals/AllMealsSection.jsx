import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import useMeals from "../../../components/hooks/useMeals";
import { Link } from "react-router-dom";
import useReviews from "../../../components/hooks/useReviews";
import { Helmet } from "react-helmet-async";



const AllMealsSection = () => {
    const [meals, refetch] = useMeals()
    const axiosSecure = useAxiosSecure();
    const [reviews] = useReviews()
    const handleDelete = id => {
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

                axiosSecure.delete(`/meals/${id}`)
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
    }

    return (
        <div>
            <Helmet>
                <title>Meal Management | All Meals Section</title>
            </Helmet>
            <HeaderTitles heading={'All Meals'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {meals.length}</h2>
            </div>
            <div className="overflow-x-auto md:text-sm text-xs">
                <table className=" w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>
                                #
                            </th>
                            <th>Meal Title</th>
                            <th>Likes</th>
                            <th>Total Reviews</th>
                            <th>Distributor Name</th>
                            <th>Distributor Email</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            meals.map((item, index) => <tr key={item._id}>
                                <th className="">
                                    {index + 1}
                                </th>
                                {/* TODO: Likes and review counts also status  */}
                                <td>
                                    {item.mealTitle}
                                </td>
                                <td>{item.likes}</td>
                                <td>{reviews.filter(review => review.mealTitle === item.mealTitle).length}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <th>
                                    <Link
                                        to={`/dashboard/editMeals/${item._id}`}
                                        className="btn btn-ghost hover:bg-transparent">
                                        <FaPencilAlt className="text-orange-500"></FaPencilAlt>
                                    </Link>
                                </th>
                                <th>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="btn btn-ghost hover:bg-transparent">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
                                    </button>
                                </th>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllMealsSection;