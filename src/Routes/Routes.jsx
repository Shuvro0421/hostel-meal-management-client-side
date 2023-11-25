import {
  createBrowserRouter,
} from "react-router-dom";
import Banner from "../Pages/Banner/Banner";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import MealDetails from "../Pages/MealDetails/MealDetails";
import MealsSection from "../Pages/MealsSection/MealsSection";
import SignUp from "../Pages/SignUp/SignUp";


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
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
            
            path: "mealsDetails/:id",
            loader: ({params}) => fetch(`http://localhost:5000/meals/${params.id}`) ,
            element: <MealDetails></MealDetails>
        },
        {
            path: "mealsSection",
            element: <MealsSection></MealsSection>
        }
      ]
    },
  ]);
  