import  { useState } from 'react';

const UpcomingMeal = ({ meal }) => {
  const { _id, mealTitle, mealImage, rating, description, likes } = meal;
  const [likeCount, setLikeCount] = useState(likes);

  const handleLikeClick = async () => {
    // Send a request to the server to update likes count
    await fetch(`https://hostel-meal-management-server-side.vercel.app/upcoming/like/${_id}`, {
      method: 'PUT',
    });

    // Update the like count locally
    setLikeCount(likeCount + 1);
  };

  return (
    <div className="card h-60 shadow-xl image-full">
      <figure><img className="w-full" src={mealImage} alt={mealTitle} /></figure>
      <div className="card-body">
        <h2 className="card-title merienda">{mealTitle}</h2>
        <p className="text-lg h-20 thin-scrollbar overflow-auto">{description}</p>
        <div className="card-actions justify-end">
          <div className="flex md:flex-row flex-col gap-3 md:gap-0 items-center justify-between w-full">
            <p className="merienda text-yellow-400">Rating: {rating}/5</p>
            <button className="btn btn-warning btn-outline" onClick={handleLikeClick}>
              Like ({likeCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingMeal;
