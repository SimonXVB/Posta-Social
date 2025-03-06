import { Button } from "../components/individual components/button";
import { Link } from "react-router";

export function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col bg-purple-200">
            <p className="text-2xl font-bold">404 - Not Found</p>
            <Link to={"/"}><Button name={"Go back"}/></Link>
        </div>
    )
}