import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";

import NavBar from "../NavBar/NavBar";


const Main = () => {
    return (
        <div>
            <Helmet>
                <title>Meal Management | Home</title>
            </Helmet>
            <NavBar></NavBar>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;