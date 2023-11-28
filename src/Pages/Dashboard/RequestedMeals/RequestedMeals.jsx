

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

import { Link } from "react-router-dom";
import useRequestMeals from "../../../components/hooks/useRequestMeals";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";


const RequestedMeals = () => {
    const [cart, refetch] = useRequestMeals()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const axiosSecure = useAxiosSecure();

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
    }

    return (
        <div>
            <HeaderTitles heading={'Requested Meals'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {cart.length}</h2>
                <h2 className="text-4xl">Total Price: ${totalPrice}</h2>
                {cart.length ? <Link to="/dashboard/payment">
                    <button className="btn btn-outline btn-warning">Pay</button>
                </Link>:
                <button disabled className="btn btn-primary">Pay</button>
                }

            </div>
            <div className="overflow-x-auto">
                <table className=" w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th className="">
                                    {index + 1}
                                </th>
                                <td className="flex items-center mt-2 justify-center">
                                    <div className="">
                                        <div>
                                            <div className="">
                                                <img className="w-10 h-10 border-2 border-yellow-400 rounded-lg" src={item.mealImage}/>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.mealTitle}
                                </td>
                                <td>${item.price}</td>
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

export default RequestedMeals;