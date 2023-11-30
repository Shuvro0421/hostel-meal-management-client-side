
import { Helmet } from 'react-helmet-async';
import useAdmin from '../../../components/hooks/useAdmin';
import useAuth from '../../../components/hooks/useAuth';
import useMeals from '../../../components/hooks/useMeals';
import useUpcomingMeals from '../../../components/hooks/useUpcomingMeals';
import HeaderTitles from '../../HeaderTitles/HeaderTitles';

// ... (existing imports)

const MyProfile = () => {
    const [isAdmin] = useAdmin();
    const { user } = useAuth();
    const [upcoming] = useUpcomingMeals()
    const [meals] = useMeals();

    // Filter meals based on category
    const filteredMeals = meals.filter((meal) => meal?.email === user?.email);
    // Filter meals based on category
    const filteredUpComingMeals = upcoming.filter((meal) => meal?.email === user?.email);

    return (
        <div>
            <Helmet>
                <title>Meal Management | Admin Profile</title>
            </Helmet>
            <HeaderTitles heading={"Admin Profile"}></HeaderTitles>
            <p className="merienda text-center md:text-3xl text-xl">
                Hey There! {isAdmin && user?.displayName}
            </p>
            <div className="flex items-center justify-center my-5">
                <img
                    className="w-20 h-20 rounded-full border-yellow-400 border-4"
                    src={isAdmin && user?.photoURL}
                    alt=""
                />
            </div>
            <p className="merienda text-center md:text-xl text-lg my-3">
                email: {isAdmin && user.email}
            </p>
            <div className='flex justify-between md:flex-row flex-col items-center merienda text-orange-500 text-xl'>
                <p>Added Meals: {filteredMeals?.length}</p>
                <p>Upcoming Meals: {isAdmin && filteredUpComingMeals?.length}</p>
            </div>
        </div>
    );
};

export default MyProfile;

