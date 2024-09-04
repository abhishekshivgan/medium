import { useRecoilState, useRecoilValue } from "recoil";
import { Avatar } from "./Avatar";
import { WriteBlogButton } from "./WriteBlogButton";
import { authState } from "../store/atoms/authState";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BlogsPageButton } from "./BlogsPageButton";


export function Appbar() {
    const auth = useRecoilValue(authState);
    const name = auth.user ? auth.user.name : "Anonymus";
    const [isDropDownVisible, setisDropdownVisible] = useState(false);
    
    const toggleDown = () => {
        if (auth.user !== null) {
            setisDropdownVisible(!isDropDownVisible);
        }
    }

    return <div className="px-10 py-2 flex justify-between border-b shadow-sm">
        <div className=" font-serif flex flex-col justify-center text-xl font-semibold">
            <Link to={"/"}>
                Medium
            </Link>
        </div>
        <div className="flex">
            <BlogsPageButton />
            <WriteBlogButton />
            {auth.isAuthenticated ? <div>
                <button type="button" onClick={toggleDown} className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <Avatar size={"big"} name={name} />
                </button>
                <DropDown isVisible={isDropDownVisible} setIsVisible={setisDropdownVisible} />
            </div>
                :
                <div>
                    <Link to={"/signin"}>
                        <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-xs px-3 py-2">Sign in</button>
                    </Link>
                </div>
            }

        </div>
    </div >
}

interface dropdownInputs {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
}

function DropDown({ isVisible, setIsVisible }: dropdownInputs) {
    const [auth, setAuth] = useRecoilState(authState);
    const navigate = useNavigate();

    const name = auth.user && auth.user.name;
    const username = auth.user && auth.user.username;

    function logout() {
        setAuth({ isAuthenticated: false, user: null });
        localStorage.removeItem("token")
        navigate("/signin");
        setIsVisible(false);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div className="absolute right-0 mt-10 w-30 ml-5 bg-white border rounded shadow-lg">
            <ul>
                <li className="px-4 py-2 text-xs hover:bg-gray-200">{name}</li>
                <li className="px-4 py-2 text-xs hover:bg-gray-200">{username}</li>
                <li onClick={logout} className="px-4 py-2 text-xs hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
        </div>
    );
}


{/* < */ }

