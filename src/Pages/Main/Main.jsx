import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import NavBar from "../NavBar/NavBar";


const Main = () => {
    return (
        <div>
            <Helmet>
                <title>Meal Management | Home</title>
            </Helmet>
            <NavBar></NavBar>
            <Banner></Banner>
        </div>
    );
};

export default Main;