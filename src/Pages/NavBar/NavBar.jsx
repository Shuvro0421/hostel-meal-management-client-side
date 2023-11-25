import { Link } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { Squeeze as Hamburger } from 'hamburger-react'
import { useEffect, useRef, useState } from "react";
import useRequestMeals from "../../components/hooks/useRequestMeals";
const NavBar = () => {
    const [isOpen, setOpen] = useState(false)
    const menuRef = useRef(null);
    const [requestMeals] = useRequestMeals()
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
        <div className="navbar  bg-yellow-400 shadow-2xl  text-black">
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
            <div className="navbar-end gap-5">

                <a className="btn btn-ghost merienda font-bold">Join Us</a>
            </div>
        </div>
    );
};

export default NavBar;