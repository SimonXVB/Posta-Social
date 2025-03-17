import { Link } from "react-router";

export function NotFound() {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <div className="mb-10 mx-2 flex justify-center items-center flex-col text-center">
                <div className="flex text-7xl font-bold font-[Lobster]">
                    <p className="text-red-500">4</p>
                    <p className="text-orange-500">0</p>
                    <p className="text-yellow-500">4</p>
                </div>
                <p className="text-2xl font-bold my-5">Sorry, couldn&apos;t find that page.</p>
                <p className="text-2xl font-bold">¯\_(ツ)_/¯</p>
            </div>
            <Link to={"/"} className="py-2 px-6 bg-blue-500 rounded-full hover:bg-orange-500 font-semibold">Go Back</Link>
        </div>
    )
}