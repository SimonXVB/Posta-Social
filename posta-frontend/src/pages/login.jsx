import { useEffect, useState } from "react"
import { Input } from "../components/individual components/input"
import { Button } from "../components/individual components/button";
import { useLogin } from "../hooks/user hooks/useLogin";
import { useRegister } from "../hooks/user hooks/useRegister";
import { Link } from "react-router";

export function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const [registerUser, setRegisterUser] = useState("");
    const [registerPW, setRegisterPW] = useState("");

    const { login } = useLogin();
    const { register, created } = useRegister();


    useEffect(() => {
        setRegisterUser("");
        setRegisterPW("");
    }, [created]);
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center font-mono font-bold" id="login">
            <Link className="m-10 text-6xl w-screen flex justify-center" to={"/"}>
                <p className="border-b-4 border-black w-fit">Posta Social</p>
            </Link>
            <div className="flex flex-col w-fit sm:flex-row">
                <div className="flex flex-col">
                    <form onSubmit={async (e) => await login(e, loginUser, loginPW)}>
                        <h1 className="text-center text-2xl">Login</h1>
                        <Input name={"Username:"} onChange={e => setLoginUser(e.target.value)} value={loginUser}/>
                        <Input name={"Password:"} onChange={e => setLoginPW(e.target.value)} value={loginPW}/>
                        <Button name={"Login"} type={"submit"}/>
                    </form>
                </div>
                <p className="flex items-center justify-center m-7 text-xl">OR</p>
                <div className="flex flex-col">
                    <form onSubmit={async (e) => await register(e, registerUser, registerPW)}>
                        <h1 className="text-center text-2xl">Register</h1>
                        <Input name={"Username:"} onChange={e => setRegisterUser(e.target.value)} value={registerUser}/>
                        <Input name={"Password:"} onChange={e => setRegisterPW(e.target.value)} value={registerPW}/>
                        <Button name={"Register"} type={"submit"}/>
                    </form>
                </div>
            </div>
        </div>
    );
};