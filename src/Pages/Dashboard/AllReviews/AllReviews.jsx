import { useState } from 'react';
import { FaEye, FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../components/hooks/useAxiosSecure';
import HeaderTitles from '../../HeaderTitles/HeaderTitles';
import { Link } from 'react-router-dom';
import useReviews from '../../../components/hooks/useReviews';
import useMeals from '../../../components/hooks/useMeals';
import { Helmet } from 'react-helmet-async';

const AllReviews = () => {
    const [reviews, refetch] = useReviews();
    const axiosSecure = useAxiosSecure();
    const [meals] = useMeals();

    const [sortOrder, setSortOrder] = useState('asc'); // or 'desc'
    const [sortColumn, setSortColumn] = useState('likes'); // 'likes' or 'reviews'

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/reviews/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your file has been deleted.',
                            icon: 'success'
                        });
                    }
                });
            }
        });
    };

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedReviews = [...reviews].sort((a, b) => {
        const aValue =
            sortColumn === 'likes'
                ? meals.find((meal) => meal.mealTitle === a.mealTitle)?.likes || 0
                : reviews.filter((review) => review.mealTitle === a.mealTitle).length;

        const bValue =
            sortColumn === 'likes'
                ? meals.find((meal) => meal.mealTitle === b.mealTitle)?.likes || 0
                : reviews.filter((review) => review.mealTitle === b.mealTitle).length;

        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return (
        <div>
            <Helmet>
                <title>Meal Management | All Reviews</title>
            </Helmet>
            <HeaderTitles heading={'All Reviews'}></HeaderTitles>
            <div className="flex merienda justify-evenly mb-8">
                <h2 className="text-4xl">Items: {reviews.length}</h2>
            </div>
            <div className="overflow-x-auto md:text-sm text-xs">
                <table className="w-full">
                    {/* head */}
                    <thead>
                        <tr className="border-2 border-yellow-400 bg-yellow-400">
                            <th>#</th>
                            <th onClick={() => handleSort('mealTitle')}>Meal Title</th>
                            <th onClick={() => handleSort('likes')}>Likes</th>
                            <th onClick={() => handleSort('reviews')}>Total Reviews</th>
                            <th>View Meal</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {sortedReviews.map((item, index) => (
                            <tr key={item._id}>
                                <th>{index + 1}</th>
                                <td>{item.mealTitle}</td>
                                <td>{meals.find((meal) => meal.mealTitle === item.mealTitle)?.likes || 0}</td>
                                <td>{reviews.filter((review) => review.mealTitle === item.mealTitle).length}</td>
                                <th>
                                    <Link to={`/mealsDetails/${item.mealId}`} className="btn btn-ghost hover:bg-transparent">
                                        <FaEye className="text-orange-500"></FaEye>
                                    </Link>
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-ghost hover:bg-transparent">
                                        <FaTrashAlt className="text-red-600"></FaTrashAlt>
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

export default AllReviews;
