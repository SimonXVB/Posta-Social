import { Link } from "react-router";
import { useLogin } from "../../hooks/user hooks/useLogin";
import { useState } from "react";
import logo from "../../assets/posta-logo.png";
import hamburger from "../../assets/menu.png";
import profile from "../../assets/profile.png";
import github from "../../assets/github.png";
import loginImg from "../../assets/login.png";
import logoutImg from "../../assets/logout.png";
import close from "../../assets/close.png";

export function Navbar({ currentUser }) {
    const { logout } = useLogin();
    const [menu, setMenu] = useState(false);

    return (
        <div className="flex justify-center">
            <div className="relative flex justify-between py-3 top-0 px-5 w-full">
                <Link to={"/"} className="hover:bg-gray-300/30 rounded-full">
                    <img src={logo} alt="Posta-Logo" className="h-10 rounded-full"/>
                </Link>
                <button className="hidden max-[960px]:block hover:bg-gray-300/30 rounded-full" onClick={() => setMenu(true)}>
                    <img src={hamburger} alt="menu" className="h-10"/>
                </button>
            </div>
            <nav className="absolute translate-x-[380px] translate-y-10 max-[960px]:hidden">
                {currentUser &&
                    <Link to={`/user/${currentUser.id}`} className="flex items-center py-2 px-6 rounded-full hover:bg-gray-300/30">
                        <p className="text-xl mr-6">Profile</p>
                        <img src={profile} alt="profile" className="h-8"/>
                    </Link>
                }
                <a href="https://github.com/SimonXVB/Posta-Social" target="_blank" className="flex items-center justify-center my-5 py-2 px-6 rounded-full hover:bg-gray-300/30">
                    <p className="text-xl mr-6">GitHub</p>
                    <img src={github} alt="Github-Logo" className="h-8"/>
                </a>
                {!currentUser && 
                    <Link to={"/login"} onClick={() => setMenu(false)} className="flex justify-between items-center py-2 px-6 rounded-full hover:bg-gray-300/30">
                        <p className="text-xl mr-6">Login</p>
                        <img src={loginImg} alt="profile" className="h-8"/>
                    </Link>
                }
                {currentUser &&
                    <button onClick={async () => await logout()} className="flex items-center justify-center py-2 px-6 rounded-full hover:bg-gray-300/30">
                        <p className="text-xl mr-6">Logout</p>
                        <img src={logoutImg} alt="logout" className="h-8"/>
                    </button>
                }
            </nav>
            {menu &&
                <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full z-10 pt-2 bg-gray-300/30" id="modal">
                    <nav className="flex justify-center items-center flex-col bg-gray-900 py-6 px-9 rounded-lg shadow-lg shadow-blue-500">
                        <div className="w-full flex justify-end mb-5">
                            <button onClick={() => setMenu(false)} className="hover:bg-gray-300/30 rounded-full">
                                <img src={close} alt="close" className="h-8"/>
                            </button>
                        </div>
                        {currentUser &&
                            <Link to={`/user/${currentUser.id}`} onClick={() => setMenu(false)} className="flex justify-between items-center py-2 px-6 bg-yellow-500 rounded-full hover:bg-gray-200/20">
                                <p className="text-xl mr-6">Profile</p>
                                <img src={profile} alt="profile" className="h-8"/>
                            </Link>
                        }
                        <a href="https://github.com/SimonXVB/Posta-Social" target="_blank" className="flex justify-between items-center my-5 py-2 px-6 bg-blue-500 rounded-full hover:bg-gray-200/20">
                            <p className="text-xl mr-6">GitHub</p>
                            <img src={github} alt="Github-Logo" className="h-8"/>
                        </a>
                        {currentUser &&
                            <button onClick={async () => await logout()} className="flex justify-between items-center py-2 px-6 bg-red-500 rounded-full hover:bg-gray-200/20">
                                <p className="text-xl mr-6">Logout</p>
                                <img src={logoutImg} alt="logout" className="h-8"/>
                            </button>
                        }
                        {!currentUser &&
                            <Link to={"/login"} onClick={() => setMenu(false)} className="flex justify-between items-center py-2 px-6 bg-red-500 rounded-full hover:bg-gray-200/20">
                                <p className="text-xl mr-6">Login</p>
                                <img src={loginImg} alt="profile" className="h-8"/>
                            </Link>
                        }
                    </nav>
                </div>
            }
        </div>
    )
};