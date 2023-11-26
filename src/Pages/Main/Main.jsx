import { Helmet } from "react-helmet-async";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";

const Main = () => {
    const location = useLocation();

    const noHeaderFooter =
        location.pathname.includes("login") || location.pathname.includes("signup");

    return (
        <div className="flex flex-col min-h-screen">
            <Helmet>
                <title>Meal Management | Home</title>
            </Helmet>
            {noHeaderFooter || <NavBar></NavBar>}
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default Main;
