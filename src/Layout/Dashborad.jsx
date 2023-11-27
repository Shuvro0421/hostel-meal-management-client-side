import { FaBook, FaHome, FaList, FaUsers, FaUtensils } from "react-icons/fa";
import { IoFastFood, IoMenu, IoNewspaper, IoPeople } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../components/hooks/useAdmin";
import useMeals from "../components/hooks/useMeals";



const Dashboard = () => {
    const [meals] = useMeals();

    // TODO: get isAdmin value from the database
    const [isAdmin] = useAdmin();
    const links =
        <>
            {
                isAdmin ? <>
                    <li>
                        <NavLink to="/dashboard/adminHome">
                            <FaHome></FaHome>
                            Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems">
                            <FaUtensils></FaUtensils>
                            Add Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                            <FaList></FaList>
                            Manage Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/bookings">
                            <FaBook></FaBook>
                            Manage Bookings</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
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
                                Requested Meals ({meals.length})</NavLink>
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
        <div>
            <div className="lg:hidden drawer">
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
                <div className="w-64 min-h-screen bg-yellow-400">
                    <ul className="menu text-orange-500 p-4">
                        {links}
                    </ul>
                </div>
                {/* dashboard content */}
                <div className="lg:flex-1 lg:p-8 lg:block hidden">
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