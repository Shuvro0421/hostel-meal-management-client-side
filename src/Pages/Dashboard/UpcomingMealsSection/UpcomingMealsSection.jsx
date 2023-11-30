import  { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import InfiniteScroll from 'react-infinite-scroll-component';
import useUpcomingMeals from '../../../components/hooks/useUpcomingMeals';
import UpcomingMeal from './UpcomingMeal';

const UpcomingMealSection = () => {
    const [page, setPage] = useState(1);
    const [upcomingMeals, hasMore] = useUpcomingMeals(page);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedMealType, setSelectedMealType] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    

    const filteredMeals = upcomingMeals.filter((meal) => {
        const mealTypeMatches = selectedMealType ? meal.mealType === selectedMealType : true;

        let priceRangeMatches = true;
        if (selectedPrice) {
            const [minPrice, maxPrice] = selectedPrice.split('-').map(Number);
            priceRangeMatches = meal.price >= minPrice && meal.price <= maxPrice;
        }

        return (
            meal.mealTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
            mealTypeMatches &&
            priceRangeMatches
        );
    });

    const fetchMoreData = () => {
        setPage(page + 1);
    };

    useEffect(() => {
        setPage(1);
    }, [searchTerm, selectedMealType, selectedPrice]);

    return (
        <div>
            <Helmet>
                <title>Meal Management | Upcoming Meals</title>
            </Helmet>
            <div className="flex md:flex-row flex-col items-center justify-center w-full">
                <input
                    type="text"
                    placeholder="Find your meal...."
                    className="input my-5 md:mx-0 mx-3 text-yellow-400 placeholder-yellow-400 input-bordered bg-transparent input-warning w-full max-w-xs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className='flex'>
                    <select
                        value={selectedMealType}
                        onChange={(e) => setSelectedMealType(e.target.value)}
                        className="mx-3 text-yellow-400 bg-transparent border-b-2 border-yellow-400"
                    >
                        <option value="">All Meal Types</option>
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                    </select>
                    <select
                        value={selectedPrice}
                        onChange={(e) => setSelectedPrice(e.target.value)}
                        className="mx-3 text-yellow-400 bg-transparent border-b-2 border-yellow-400"
                    >
                        <option value="">All Prices</option>
                        <option value="0-5">0$ - 5$</option>
                        <option value="5-10">5$ - 10$</option>
                        <option value="10-12">10$ - 12$</option>
                    </select>
                </div>
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
                            <UpcomingMeal meal={meal} key={index}></UpcomingMeal>
                        ))}
                    </div>
                </InfiniteScroll>
            )}
        </div>
    );
};

export default UpcomingMealSection;
