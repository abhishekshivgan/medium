import { Quote } from "../components/Quote";
import { SignupCard } from "../components/SignupCard";


export function Signup() {
    return <div className="grid lg:grid-cols-2">
        <div className="h-screen">
            <SignupCard />
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </div>
}


// import { SignupInput } from "@abhishekshivgan/medium-common";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { LabelledInput } from "../components/LabelledInput";

// export function Signup() {
//     const [postInputs, setPostInputs] = useState<SignupInput>({
//         name: "",
//         username: "",
//         password: ""
//     })

//     return <div className="flex flex-col justify-center h-screen">
//         <div className="flex justify-center">
//             <div id="abhi" className="w-1/2">

            
//                 <div className="text-center">
//                     <div className="text-3xl font-bold">
//                        Create an account
//                     </div>
//                     <div className="text-slate-500 mt-2">
//                         Already have an account?
//                         <Link className="underline ml-2" to={"/signin"}>
//                             Sign in
//                         </Link>
//                     </div>
//                 </div>


//                 <div>
//                     <LabelledInput label={"Name"} placeholder={"Enter you Name"} onChange={(e) => {
//                         setPostInputs(c => ({
//                             ...c,
//                             name: e.target.value
//                         }))
//                     }} />

//                     <LabelledInput label={"Email"} type={"email"} placeholder={"Enter you Email"} onChange={(e) => {
//                         setPostInputs(c => ({
//                             ...c,
//                             username: e.target.value
//                         }))
//                     }} />

//                     <LabelledInput label={"Password"} type={"password"} placeholder={"Enter you Password"} onChange={(e) => {
//                         setPostInputs(c => ({
//                             ...c,
//                             password: e.target.value
//                         }))
//                     }} />
                    
//                     <div className="pr-4 pl-4 mt-5">
//                         <button type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign up</button>
//                     </div>

//                 </div>
//             </div>
//         </div>
//     </div>
// }



