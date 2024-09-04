import { SigninInput } from "@abhishekshivgan/medium-common";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LabelledInput } from "../components/LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";


export function SigninCard() {
    const [postInputs, setPostInputs] = useState<SigninInput>({
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
            const jwt = response.data.token;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
            window.location.reload();
        } catch(e) {
            console.log(e);
        }
    }

    return <div className="flex flex-col justify-center h-screen">
        <div className="flex justify-center">
            <div id="abhi" className="w-1/2">


                <div className="text-center">
                    <div className="text-3xl font-bold">
                        Sign in to your account
                    </div>
                    <div className="text-slate-500 mt-2">
                        Don't have an account?
                        <Link className="underline ml-2" to={"/signup"}>
                            Sign up
                        </Link>
                    </div>
                </div>


                <div>
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
                        <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
                    </div>

                </div>
            </div>
        </div>
    </div>
}







