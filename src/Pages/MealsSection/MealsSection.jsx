import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import useMeals from '../../components/hooks/useMeals';
import AllMeal from '../Meals/AllMeal';

const MealsSection = () => {
  const [page, setPage] = useState(1); // Track the current page
  const [meals, hasMore] = useMeals(page); // Assuming useMeals takes a page parameter
  const [searchTerm, setSearchTerm] = useState('');

  // Filter meals based on the mealTitle
  const filteredMeals = meals.filter((meal) =>
    meal.mealTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchMoreData = () => {
    // Increment the page to fetch the next set of data
    setPage(page + 1);
  };

  useEffect(() => {
    // Reset the page to 1 when the search term changes
    setPage(1);
  }, [searchTerm]);

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Find your meal...."
          className="input my-5 md:mx-0 mx-3 text-yellow-400 placeholder-yellow-400 input-bordered bg-transparent input-warning w-full max-w-xs"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredMeals.length === 0 && <p className='text-center merienda text-orange-500'>No meals found.</p>}

      {filteredMeals.length > 0 && (
        <InfiniteScroll
          dataLength={filteredMeals.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className='text-center merienda text-orange-500'>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <p className='text-center merienda text-orange-500 my-2'>Congrats! you have seen all meals</p>
            </p>
          }
        >
          <div className="grid grid-cols-1 gap-3 m-5">
            {filteredMeals.map((meal, index) => (
              <AllMeal meal={meal} key={index}></AllMeal>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default MealsSection;
