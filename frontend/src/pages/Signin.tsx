import { Quote } from "../components/Quote";
import { SigninCard } from "../components/SigninCard";



export function Signin() {
    return <div className="grid lg:grid-cols-2">
        <div className="h-screen">
            <SigninCard/>
        </div>
        <div className="invisible lg:visible">
            <Quote />
        </div>
    </div>
}
