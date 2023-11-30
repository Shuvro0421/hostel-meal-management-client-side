import { Helmet } from "react-helmet-async";


const ErrorPage = () => {
    <Helmet>
        <title>Meal Management | 404</title>
    </Helmet>
    return (
        <div className="flex justify-center items-center">
            <img src={'https://cdn.dribbble.com/users/718859/screenshots/3267029/jisunpark_404-error.gif'} alt="" />
        </div>
    );
};

export default ErrorPage;