import { Link, useLocation } from "react-router";

export function LogoutNav() {
    const loc = useLocation();

    return (
        <>
        {loc.pathname !== "/login" &&
            <div className="flex justify-center">
                <nav className="flex justify-between font-black text-2xl sticky py-3 top-0 px-5 max-w-455 w-full border-x-4 border-white" id="logoutNav">
                    <Link to={"/"} className="text-black">
                        Posta
                    </Link>
                    <Link to={"/login"} className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M480-120v-80h280v-560H480v-80h280q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H480Zm-80-160-55-58 102-102H120v-80h327L345-622l55-58 200 200-200 200Z"/></svg>
                    </Link>
                </nav>
            </div>
        }
        </>
    )
};