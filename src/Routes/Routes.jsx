import {
  createBrowserRouter,
} from "react-router-dom";
import Banner from "../Pages/Banner/Banner";
import Main from "../Pages/Main/Main";
import MealDetails from "../Pages/MealDetails/MealDetails";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Banner></Banner>
        },
        {
            
            path: "mealsDetails/:id",
            loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`) ,
            element: <MealDetails></MealDetails>
        }
      ]
    },
  ]);
  