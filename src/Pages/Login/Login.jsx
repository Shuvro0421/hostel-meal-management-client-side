import { useContext } from 'react';


import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2'
import { AuthContext } from '../Providers/AuthProvider';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    console.log('state in the location login page', location.state)


    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                navigate(from, { replace: true });
            })
    }
    return (
        <>
            <Helmet>
                <title>Meal Management | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-yellow-400">
                <div className="hero-content flex-col md:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <img src="https://static.vecteezy.com/system/resources/thumbnails/015/658/512/small_2x/join-us-3d-render-text-phrase-inscription-png.png" alt="" />
                    </div>
                    <div className="card md:w-full  max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                            </div>
                            <div className="form-control mt-6">
                                <input  className="btn btn-outline btn-warning" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className='px-6'><small>New Here? <Link to="/signup"> <span className='text-orange-500 font-semibold'>Create an account</span> </Link> </small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;