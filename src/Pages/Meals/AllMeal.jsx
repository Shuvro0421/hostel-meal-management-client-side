import { Link } from "react-router-dom";


const AllMeal = ({ meal }) => {
    const { mealTitle, mealImage, rating, price , _id } = meal
    return (
        <div className="card h-60 shadow-xl image-full">
            <figure><img className="w-full" src={mealImage} alt={mealTitle} /></figure>
            <div className="card-body">
                <h2 className="card-title merienda">{mealTitle}</h2>
                <p className="text-lg merienda text-yellow-400 ">Price: ${price}</p>
                <div className="card-actions justify-end">
                    <div className="flex md:flex-row flex-col gap-3 md:gap-0 items-center justify-between w-full">
                        <p className="merienda text-yellow-400">Rating: {rating}/5</p>
                        <Link to={`/mealsDetails/${_id}`}>
                            <button className="btn btn-outline border-yellow-400 hover:bg-yellow-400 border-2 hover:border-yellow-400 text-yellow-400 hover:text-black merienda">see detail</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllMeal; 