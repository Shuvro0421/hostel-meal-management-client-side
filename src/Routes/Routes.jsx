import {
  createBrowserRouter,
} from "react-router-dom";
import Dashboard from "../Layout/Dashborad";
import Banner from "../Pages/Banner/Banner";
import AddMeals from "../Pages/Dashboard/AddMeals/AddMeals";
import AdminProfile from "../Pages/Dashboard/AdminProfile/AdminProfile";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";
import MyReviews from "../Pages/Dashboard/myReviews/myReviews";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import RequestedMeals from "../Pages/Dashboard/RequestedMeals/RequestedMeals";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import MealDetails from "../Pages/MealDetails/MealDetails";
import MealsSection from "../Pages/MealsSection/MealsSection";
import PackagePayment from "../Pages/Packages/PackagePayment";
import SignUp from "../Pages/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";


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
        loader: ({ params }) => fetch(`http://localhost:5000/meals/${params.id}`),
        element: <MealDetails></MealDetails>
      },
      {
        path: "mealsSection",
        element: <MealsSection></MealsSection>
      },


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
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
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
      }

    ]
  }
]);
