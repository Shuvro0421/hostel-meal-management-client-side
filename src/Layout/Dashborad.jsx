import { FaBook, FaCrown, FaHandHolding, FaHome,  FaPlus,  FaUsers, FaUtensils} from "react-icons/fa";
import {  IoFastFood, IoMenu, IoNewspaper, IoPeople } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../components/hooks/useAdmin";
import useRequestMeals from "../components/hooks/useRequestMeals";



const Dashboard = () => {
    const [requestedMeals] = useRequestMeals()

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const links =
        <>
            {
                isAdmin ? <>
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/adminProfile">
                            <FaCrown></FaCrown>
                            Admin Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageUsers">
                            <FaUsers></FaUsers>
                            Manage Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addMeals">
                            <FaPlus></FaPlus>
                            Add Meals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                            <IoFastFood></IoFastFood>
                            All Meals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                            <FaBook></FaBook>
                            All Reviews</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                            <FaHandHolding></FaHandHolding>
                            Serve Meals</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                            <FaUtensils></FaUtensils>
                            Upcoming Meals</NavLink>
                    </li>
                </>
                    :
                    <>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                User Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myProfile">
                                <IoPeople></IoPeople>
                                My Profile</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/requestedMeals">
                                <IoFastFood></IoFastFood>
                                Requested Meals ({requestedMeals.length})</NavLink>
                        </li>
                        <li>
                            <NavLink to="/dashboard/myReviews">
                                <IoNewspaper></IoNewspaper>
                                My Reviews</NavLink>
                        </li>
                    </>
            }
        </>


    return (
        <div className="">
            <div className="lg:hidden  drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer" className="btn btn-ghost bg-transparent text-3xl text-orange-500"><IoMenu></IoMenu></label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 md:w-60 w-60 text-orange-500 bg-yellow-400 min-h-full">
                        {links}
                    </ul>
                </div>
            </div>
            <div className="lg:flex hidden">
                {/* dashboard side bar */}
                <div className="w-64 min-h-screen  fixed bg-yellow-400">
                    <ul className="menu text-orange-500 p-4">
                        {links}
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="lg:flex-1  items-center justify-center mx-20 ml-96 lg:p-8 lg:block hidden">
                    <Outlet></Outlet>
                </div>
            </div>
            {/* dashboard content */}
            <div className="md:flex-1 md:p-5 md:block p-5 lg:hidden">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;