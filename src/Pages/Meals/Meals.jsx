import useMeals from "../../components/hooks/useMeals";
import Meal from "./Meal";




const Meals = ({ category }) => {
  const [meals] = useMeals();

  // Filter meals based on category
  const filteredMeals = meals.filter((meal) => meal.mealType === category);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 m-5">
      {filteredMeals.map((meal, index) => (
        <Meal meal={meal} key={index}></Meal>
      ))}
    </div>
  );
};

export default Meals;
