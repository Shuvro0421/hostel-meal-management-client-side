
import { Link } from "react-router-dom";
import useAdmin from "../../components/hooks/useAdmin";
import useAuth from "../../components/hooks/useAuth";

const Package = ({ packageItem }) => {
    const { packageTitle, packageColor, price, _id } = packageItem
    const { user } = useAuth()
    const [isAdmin] = useAdmin()
    return (
        <div>
            <div className="card border-2 border-orange-500">
                <div className="card-body">
                    <h2 style={{ color: packageColor }} className={` bg-orange-500 p-1 text-base text-center rounded-lg merienda`}>{packageTitle}</h2>
                    <p className="font-semibold merienda">Price : ${price}/mo</p>
                    <div className="card-actions justify-end">
                        {
                            user || isAdmin ?
                                <Link className="btn w-full btn-outline btn-warning" to={`/dashboard/packagePayment/${_id}`}>
                                    Get started</Link>
                                :
                                <p className="text-center text-red-500 font-semibold">Need to login first <Link className="text-orange-500"
                                    to={'/login'}>Login</Link></p>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Package;