import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../components/hooks/useAxiosSecure";
import useRequestMeals from "../../../components/hooks/useRequestMeals";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";
import { useState } from "react";
import { Helmet } from "react-helmet-async";


const ServeMeals = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [requestMeals, refetch] = useRequestMeals();
    const axiosSecure = useAxiosSecure();

    const handleStatusUpdate = (id) => {
        // Make a PUT request to update the status
        axiosSecure.put(`/requestMeals/${id}`, { status: 'served' })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        title: "Status Updated!",
                        text: "Meal request status has been updated to 'served'.",
                        icon: "success"
                    });
                }
            })
            .catch(error => {
                console.error('Error updating status:', error);
                // Handle error
            });
    };

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
                    });
            }
        });
    };

    const handleSearch = async () => {
        try {
            const response = await axiosSecure.get(`/requestMeals/search?query=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for users:', error);
            // Handle error
        }
    };

    return (
        <div>
            <Helmet>
                <title>Meal Management | Serve Meals</title>
            </Helmet>
            <HeaderTitles heading={'Serve Meals'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {requestMeals.length}</h2>
            </div>
            {/* Search input field and button */}
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mr-2 p-3 w-1/2 border border-gray-300 rounded"
                />
                <button
                    onClick={handleSearch}
                    className="btn btn-outline btn-warning"
                >
                    Search
                </button>
            </div>

            {/* Display search results or requestMeals based on search state */}
            {searchQuery ? (
                // Display search results
                <div>
                    <h2>Search Results</h2>
                    <div className="overflow-x-auto md:text-sm text-xs">
                        <table className=" w-full">
                            {/* head */}
                            <thead>
                                <tr className="border-2 border-yellow-400 bg-yellow-400">
                                    <th>#</th>
                                    <th>Meal Title</th>
                                    <th>Distributor Name</th>
                                    <th>Distributor Email</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {searchResults.map((item, index) => (
                                    <tr key={item._id}>
                                        <th className="">{index + 1}</th>
                                        <td>{item.mealTitle}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td
                                            className="cursor-pointer text-blue-500"
                                            onClick={() => handleStatusUpdate(item._id)}
                                        >
                                            {item.status}
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
            ) : (
                // Display requestMeals
                <div>
                    <div className="overflow-x-auto md:text-sm text-xs">
                        <table className=" w-full">
                            {/* head */}
                            <thead>
                                <tr className="border-2 border-yellow-400 bg-yellow-400">
                                    <th>#</th>
                                    <th>Meal Title</th>
                                    <th>Distributor Name</th>
                                    <th>Distributor Email</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {requestMeals.map((item, index) => (
                                    <tr key={item._id}>
                                        <th className="">{index + 1}</th>
                                        <td>{item.mealTitle}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td
                                            className="cursor-pointer text-orange-500"
                                            onClick={() => handleStatusUpdate(item._id)}
                                        >
                                            {item.status}
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
            )}
        </div>
    );
};

export default ServeMeals;

