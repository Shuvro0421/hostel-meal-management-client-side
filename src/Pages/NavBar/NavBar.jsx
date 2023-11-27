import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Squeeze as Hamburger } from 'hamburger-react'
import { useContext, useEffect, useRef, useState } from "react";
import useRequestMeals from "../../components/hooks/useRequestMeals";
import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../../components/hooks/useAdmin";
const NavBar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isOpen, setOpen] = useState(false)
    const [isAdmin] = useAdmin()
    const menuRef = useRef(null);
    const [requestMeals] = useRequestMeals()
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }



    const links =
        <>
            <li><Link>Home</Link></li>
            <li><Link to={'/mealsSection'}>Meals</Link></li>
            <li><Link>Upcoming Meals</Link></li>
            <li><Link>
                <div className="relative">
                    <IoIosNotifications className="text-2xl text-orange-500 "></IoIosNotifications>
                    <p className=" text-orange-500 w-4 h-4 text-center  text-xs absolute -top-0 -right-2">{requestMeals.length}</p>
                </div>
            </Link></li>


        </>
    const linksDrawer =
        <>
            <div className="flex-1 font-semibold">
                <li className="my-10 text-center text-2xl merienda">{user?.displayName || isAdmin?.displayName}</li>
                <li><Link>Home</Link></li>
                <li><Link to={'/mealsSection'}>Meals</Link></li>
                {
                    user && isAdmin && <li><Link to="/dashboard/adminProfile">Dashboard</Link></li>
                }
                {
                    user && !isAdmin && <li><Link to="/dashboard/myProfile">Dashboard</Link></li>
                }
            </div>
            <li onClick={handleLogOut} className="btn btn-outline btn-error">Logout</li>
        </>
    const toggleMenu = () => {
        setOpen(!isOpen); // Toggles the state of the menu
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false); // Close the menu if the click occurs outside
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="navbar bg-yellow-400 shadow-2xl  text-black">
            <div className="dropdown lg:hidden " ref={menuRef}>
                <Hamburger color="#FFA500" size={25} tabIndex={0} toggled={isOpen} toggle={toggleMenu} />
                <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-20 p-2 text-orange-500 shadow bg-base-100 rounded-box w-52 ${isOpen ? 'block' : 'hidden'} `}>
                    {links}
                </ul>
            </div>
            <div className="font-bold navbar-start md:w-1/2 w-full">
                <p className='merienda'>Hostel Meal Management</p>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu text-orange-500 font-bold menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end  gap-5">
                {
                    user || isAdmin ?
                        <div>
                            <div className="drawer z-[100000] drawer-end">
                                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                                <div className="drawer-content">
                                    {/* Page content here */}
                                    <label htmlFor="my-drawer-4" className="drawer-button btn btn-ghost hover:bg-transparent">
                                        <img className="w-10 h-10 border-4 border-orange-500 rounded-full" src={user?.photoURL || isAdmin?.photoURL} alt="" />
                                    </label>
                                </div>
                                <div className="drawer-side">
                                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                                    <ul className="menu p-4 bg-yellow-400 flex flex-col md:w-80 w-60 min-h-full  text-base-content">
                                        {linksDrawer}
                                    </ul>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                        :
                        <Link to={'/login'} className="btn btn-ghost merienda font-bold">Join Us</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;