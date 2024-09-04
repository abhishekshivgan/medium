import { SignupInput } from "@abhishekshivgan/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ErrorPopup } from "./ErrorPopup";


export function SignupCard() {
    const [statusCode, setStatusCode] = useState(0);
    const [statusText, setStatusText] = useState("");
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    function closePopup() {
        setIsPopupOpen(false);
    }

    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();

async function sendRequest() {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs);
        if (response.status >= 200 && response.status < 300) {
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        } else {
            setStatusCode(response.status);
            console.log(response.data.msg)
            setStatusText(response.data.msg || 'Sign up failed. Please try again.');
            setIsPopupOpen(true);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            setStatusCode(error.response?.status || 500);
            setStatusText(error.response?.data.msg || 'Sign up failed. Please try again.');
        } else {
            setStatusText('An unexpected error occurred. Please try again.');
        }
        setIsPopupOpen(true);
    }
}

    
    

    return <div>
        <div className="flex flex-col justify-center h-screen">
            <div className="flex justify-center">
                <div id="abhi" className="w-1/2">


                    <div className="text-center">
                        <div className="text-3xl font-bold">
                            Create an account
                        </div>
                        <div className="text-slate-500 mt-2">
                            Already have an account?
                            <Link className="underline ml-2" to={"/signin"}>
                                Sign in
                            </Link>
                        </div>
                    </div>


                    <div>
                        <LabelledInput label={"Name"} placeholder={"Enter you Name"} onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                name: e.target.value.toLowerCase()
                            }))
                        }} />

                        <LabelledInput label={"Email"} type={"email"} placeholder={"Enter you Email"} onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                username: e.target.value.toLowerCase()
                            }))
                        }} />

                        <LabelledInput label={"Password"} type={"password"} placeholder={"Enter you Password"} onChange={(e) => {
                            setPostInputs(c => ({
                                ...c,
                                password: e.target.value
                            }))
                        }} />

                        <div className="pr-4 pl-4 mt-5">
                            <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        {/* render only when status code is >= 200 or < 300 */}
        <ErrorPopup statusCode={statusCode} statusText={statusText} isOpen={isPopupOpen} onClose={closePopup} />
    </div>
}
