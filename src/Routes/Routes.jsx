import {
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../Layout/Dashborad";
import Banner from "../Pages/Banner/Banner";
import AddMeals from "../Pages/Dashboard/AddMeals/AddMeals";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import AllMealsSection from "../Pages/Dashboard/AllMeals/AllMealsSection";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";

import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyReviews from "../Pages/Dashboard/myReviews/myReviews";
import Payment from "../Pages/Dashboard/Payment/Payment";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import ServeMeals from "../Pages/Dashboard/ServeMeals/ServeMeals";
import UpcomingMeals from "../Pages/Dashboard/UpcomingMeals/UpcomingMeals";
import UpcomingMealSection from "../Pages/Dashboard/UpcomingMealsSection/UpcomingMealsSection";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import EditMeals from "../Pages/MealDetails/EditMeals";
import MealDetails from "../Pages/MealDetails/MealDetails";
import MealsSection from "../Pages/MealsSection/MealsSection";
import PackagePayment from "../Pages/Packages/PackagePayment";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage></ErrorPage>,
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
        loader: ({ params }) => fetch(`https://hostel-meal-management-server-side.vercel.app/meals/${params.id}`),
        element: <MealDetails></MealDetails>
      },
      {
        path: "mealsSection",
        element: <MealsSection></MealsSection>
      },
      {
        path: "upcomingMealSection",
        element: <UpcomingMealSection></UpcomingMealSection>
      }


    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      // normal user routes
      {
        path: 'myProfile',
        element: <MyProfile></MyProfile>
      },
      {
        path: 'requestedMeals',
        element: <RequestedMeals></RequestedMeals>
      },
      {
        path: 'myReviews',
        element: <MyReviews></MyReviews>
      },
      {
        path: 'packagePayment/:id',
        element: <PrivateRoute><PackagePayment></PackagePayment></PrivateRoute>
      },
      {
        path: 'payment',
        element: <Payment></Payment>
      },

      // admin routes
      {
        path: 'adminProfile',
        element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'addMeals',
        element: <AdminRoute><AddMeals></AddMeals></AdminRoute>
      },
      {
        path: 'allMealsSection',
        element: <AdminRoute><AllMealsSection></AllMealsSection></AdminRoute>
      },
      {
        path: 'editMeals/:id',
        loader: ({params}) => fetch(`https://hostel-meal-management-server-side.vercel.app/meals/${params.id}`),
        element: <AdminRoute><EditMeals></EditMeals></AdminRoute>

      },
      {
        path: 'allReviews',
        element: <AdminRoute><AllReviews></AllReviews></AdminRoute>
      },
      {
        path: 'serveMeals',
        element: <AdminRoute><ServeMeals></ServeMeals></AdminRoute>
      },
      {
        path: 'upcomingMeals',
        element: <AdminRoute><UpcomingMeals></UpcomingMeals></AdminRoute>
      }

    ]
  }
]);
