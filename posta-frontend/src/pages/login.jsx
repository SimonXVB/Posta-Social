import { useState, useContext, useEffect } from "react"
import { Input } from "../components/individual components/input"
import { useLogin } from "../hooks/user hooks/useLogin";
import { useRegister } from "../hooks/user hooks/useRegister";
import { Link, useNavigate } from "react-router";
import { CurrentUserContext } from "../context/currentUserContext";

export function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const [registerUser, setRegisterUser] = useState("");
    const [registerPW, setRegisterPW] = useState("");

    const { login } = useLogin();
    const { register } = useRegister();
    const nav = useNavigate();
    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);

    async function log(e) {
        const error = await login(e, loginUser, loginPW);

        if(!error) {
            setRegisterUser("");
            setRegisterPW("");
        };
    };

    async function reg(e) {
        const error = await register(e, registerUser, registerPW);

        if(!error) {
            setRegisterUser("");
            setRegisterPW("");
        };
    };

    useEffect(() => {
        if(!currentUserLoading && currentUser) {
            nav("/");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserLoading]);
    
    return (
        <div className="flex flex-col justify-center items-center my-auto py-10">
            {!currentUserLoading &&
            <>
            <div className="mb-10">
                <p className="font-semibold">Welcome to</p>
                <Link className="text-6xl flex justify-center font-[Lobster] hover:underline" to={"/"}>
                    <p className="text-red-500">P</p>
                    <p className="text-orange-500">o</p>
                    <p className="text-yellow-500">s</p>
                    <p className="text-blue-500">t</p>
                    <p className="text-red-500">a</p>
                    <p>-</p>
                    <p className="text-orange-500">S</p>
                    <p className="text-yellow-500">o</p>
                    <p className="text-blue-500">c</p>
                    <p className="text-red-500">i</p>
                    <p className="text-orange-500">a</p>
                    <p className="text-yellow-500">l</p>
                </Link>
            </div>
            <div className="flex flex-col sm:flex-row">
                <form onSubmit={e => log(e)} className="bg-gray-900 flex flex-col justify-between p-6 rounded-3xl shadow-md shadow-red-500">
                    <div>
                        <h1 className="text-2xl font-bold">Login</h1>
                        <Input name={"Username:"} onChange={e => setLoginUser(e.target.value)} value={loginUser}/>
                        <Input name={"Password:"} onChange={e => setLoginPW(e.target.value)} value={loginPW}/>
                    </div>
                    <button type="submit" className="py-2 px-6 w-full bg-red-500 rounded-full hover:bg-yellow-500 font-semibold">Login</button>
                </form>
                <p className="flex items-center justify-center m-7 text-xl font-semibold">OR</p>
                <form onSubmit={e => reg(e)} className="bg-gray-900 p-6 rounded-3xl shadow-md shadow-blue-500">
                    <h1 className="text-2xl font-bold">Register</h1>
                    <Input name={"Username:"} onChange={e => setRegisterUser(e.target.value)} value={registerUser}/>
                    <div className="text-sm -translate-y-2">{registerUser.length} / 25</div>
                    <Input name={"Password:"} onChange={e => setRegisterPW(e.target.value)} value={registerPW}/>
                    <button type="submit" className="py-2 px-6 w-full bg-blue-500 rounded-full hover:bg-orange-500 font-semibold">Register</button>
                </form>
            </div>
            </>
            }
            <div className="mt-10">
                <a href="https://github.com/SimonXVB/Posta-Social" target="_blank" className="font-semibold p-2 rounded-full text-2xl flex items-center hover:bg-gray-500/40">
                    <img src="/github.png" className="h-9 mr-4" alt="Github Logo"/>
                    GitHub Repo
                </a>
            </div>
        </div>
    );
};