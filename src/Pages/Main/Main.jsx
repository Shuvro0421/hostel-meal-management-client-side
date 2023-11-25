import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";

import NavBar from "../NavBar/NavBar";


const Main = () => {
    const location = useLocation();
    
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            <Helmet>
                <title>Meal Management | Home</title>
            </Helmet>
            { noHeaderFooter || <NavBar></NavBar>}
            <Outlet></Outlet>
            { noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;