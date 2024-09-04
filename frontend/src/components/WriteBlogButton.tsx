import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../store/atoms/authState';
import { useEffect, useState } from 'react';
import { fetchUserData } from '../utils/auth';
import { SigninPopup } from './SignInPopup';

export function WriteBlogButton() {
    const navigate = useNavigate();

    const [auth, setAuth] = useRecoilState(authState);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token).then(user => {
                if (user) {
                    setAuth({ isAuthenticated: true, user });
                } else {
                    setAuth({ isAuthenticated: false, user: null });
                }
            }).catch(() => {
                setAuth({ isAuthenticated: false, user: null });
            });
        } else {
            setAuth({ isAuthenticated: false, user: null });
        }
    }, [setAuth]);

    const handleClick = () => {
        if (auth.isAuthenticated) {
            navigate("/publish");
        } else {
            console.log("hi")
            setIsPopupOpen(true);
            console.log("hi")
        }
    }

    const closePopup = () => {
        setIsPopupOpen(false)
    }

    return <div>
        <button onClick={handleClick} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-normal rounded-full text-xs px-3 py-2 text-center mr-3">
            Write Blog
        </button>
        <SigninPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
}