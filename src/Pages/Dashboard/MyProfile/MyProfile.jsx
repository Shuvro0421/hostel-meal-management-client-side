import { useEffect } from "react";
import { useState } from "react";
import { FaGem } from "react-icons/fa";
import useAuth from "../../../components/hooks/useAuth";
import HeaderTitles from "../../HeaderTitles/HeaderTitles";


const MyProfile = () => {
    const { user } = useAuth()
    const [isUser, setIsUser] = useState([])
    const [isUserEmail, setIsUserEmail] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/packagePayments')
            .then(res => res.json())
            .then(data => setIsUser(data))
    }, [])

    useEffect(() => {
        const isThereUser = isUser.find(isIsUser => isIsUser?.email === user?.email)
        setIsUserEmail(isThereUser)

    }, [isUser, user?.email])

    return (
        <div>
            <HeaderTitles heading={'My Profile'}></HeaderTitles>
            <p className="merienda text-center md:text-3xl text-xl">Hey There! {user?.displayName}</p>
            <div className="flex items-center justify-center my-5">
                <img className="w-20 h-20 rounded-full border-yellow-400 border-4" src={user?.photoURL} alt="" />
            </div>
            <div className="flex items-center justify-center gap-3">
                <FaGem className="text-2xl text-[#CD7F32]"></FaGem>
                {
                    isUserEmail?.packageName === 'gold' && <FaGem className="text-2xl text-[#FFD700]" />
                }
                {
                    isUserEmail?.packageName === 'platinum' && <FaGem className="text-2xl text-violet-600" />
                }
                {
                    isUserEmail?.packageName === 'silver' && <FaGem className="text-2xl text-[#C0C0C0]" />
                }

            </div>
            <p className="merienda text-center md:text-xl text-lg my-3">email: {user?.email}</p>

        </div>
    );
};

export default MyProfile;