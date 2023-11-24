import useMeals from "../../components/hooks/useMeals";
import AllMeal from "./AllMeal";



const AllMeals = () => {
  const [meals] = useMeals();

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 m-5">
      {meals.map((meal, index) => (
      
        <AllMeal meal={meal} key={index}></AllMeal>
      ))}
    </div>
  );
};

export default AllMeals;
