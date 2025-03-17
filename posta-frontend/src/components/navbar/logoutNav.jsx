import { Link } from "react-router";
import { useState } from "react";

export function LogoutNav() {
    const [menu, setMenu] = useState(false);

    return (
        <div className="flex justify-center">
            <div className="relative flex justify-between py-3 top-0 px-5 w-full">
                <Link to={"/"} className="text-black hover:bg-gray-300/30 rounded-full">
                        <img src="/src/assets/posta-logo.png" alt="Posta-Logo" className="h-10 rounded-full"/>
                </Link>
                <button className="hidden max-[960px]:block hover:bg-gray-300/30 rounded-full" onClick={() => setMenu(true)}>
                    <img src="/src/assets/menu.png" alt="menu" className="h-10"/>
                </button>
            </div>
            <nav className="absolute translate-x-[380px] translate-y-10 max-[960px]:hidden">
                <Link to={"/login"} onClick={() => setMenu(false)} className="flex justify-between items-center py-2 px-6 rounded-full hover:bg-gray-300/30">
                    <p className="text-xl mr-6">Login</p>
                    <img src="/src/assets/login.png" alt="profile" className="h-8"/>
                </Link>
                <a href="https://github.com/SimonXVB/Posta-Social" target="_blank" className="flex justify-between items-center my-5 py-2 px-6 rounded-full hover:bg-gray-300/30">
                    <p className="text-xl mr-6">GitHub</p>
                    <img src="/src/assets/github.png" alt="Github-Logo" className="h-8"/>
                </a>
            </nav>
            {menu &&
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-10 pt-2 bg-gray-300/30" id="modal">
                    <nav className="flex justify-center items-center flex-col bg-gray-900 py-6 px-9 rounded-lg shadow-lg shadow-red-500">
                        <div className="w-full flex justify-end mb-5">
                            <button onClick={() => setMenu(false)} className="hover:bg-gray-300/30 rounded-full">
                                <img src="/src/assets/close.png" alt="close" className="h-8"/>
                            </button>
                        </div>
                        <Link to={"/login"} onClick={() => setMenu(false)} className="flex justify-between items-center py-2 px-6 bg-red-500 rounded-full hover:bg-gray-200/20">
                            <p className="text-xl mr-6">Login</p>
                            <img src="/src/assets/login.png" alt="profile" className="h-8"/>
                        </Link>
                        <a href="https://github.com/SimonXVB/Posta-Social" target="_blank" className="flex justify-between items-center my-5 py-2 px-6 bg-yellow-500 rounded-full hover:bg-gray-200/20">
                            <p className="text-xl mr-6">GitHub</p>
                            <img src="/src/assets/github.png" alt="Github-Logo" className="h-8"/>
                        </a>
                    </nav>
                </div>
            }
        </div>
    )
};