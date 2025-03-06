import { useEffect, useState } from "react"
import { Input } from "../components/individual components/input"
import { Button } from "../components/individual components/button";
import { useLogin } from "../hooks/user hooks/useLogin";
import { useRegister } from "../hooks/user hooks/useRegister";
import { Link } from "react-router";
import { ErrorModal } from "../components/individual components/loginErrorModal";

export function Login() {
    const [loginUser, setLoginUser] = useState("");
    const [loginPW, setLoginPW] = useState("");
    const [registerUser, setRegisterUser] = useState("");
    const [registerPW, setRegisterPW] = useState("");
    const [registerBio, setRegisterBio] = useState("");

    const { login, error, setError } = useLogin();
    const { register, regError, setRegError, created } = useRegister();

    function setErrorModal() {
        setError(null);
        setRegError(null);
    };

    useEffect(() => {
        setRegisterUser("");
        setRegisterPW("");
        setRegisterBio("");
    }, [created]);
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center font-mono font-bold" id="login">
            <Link className="m-10 text-6xl w-screen flex justify-center" to={"/"}>
                <p className="border-b-4 border-black w-fit">Posta Social</p>
            </Link>
            <div className="flex flex-col w-fit sm:flex-row">
                <div className="flex flex-col">
                    <form onSubmit={(e) => login(e, loginUser, loginPW)}>
                        <h1 className="text-center text-2xl">Login</h1>
                        <Input name={"Username:"} onChange={e => setLoginUser(e.target.value)} value={loginUser}/>
                        <Input name={"Password:"} onChange={e => setLoginPW(e.target.value)} value={loginPW}/>
                        <Button name={"Login"} type={"submit"}/>
                    </form>
                </div>
                <p className="flex items-center justify-center m-7 text-xl">OR</p>
                <div className="flex flex-col">
                    <form onSubmit={(e) => register(e, registerUser, registerPW, registerBio)}>
                        <h1 className="text-center text-2xl">Register</h1>
                        <Input name={"Username:"} onChange={e => setRegisterUser(e.target.value)} value={registerUser}/>
                        <Input name={"Password:"} onChange={e => setRegisterPW(e.target.value)} value={registerPW}/>
                        <Input name={"Bio:"} onChange={e => setRegisterBio(e.target.value)} value={registerBio}/>
                        <Button name={"Register"} type={"submit"}/>
                    </form>
                </div>
            </div>
            {error === "userError" && <ErrorModal error={"Incorrect Username Or Password"} setErrorModal={setErrorModal}/>}
            {error === "error" && <ErrorModal error={"An Error Occurred, Try Again Later"} setErrorModal={setErrorModal}/>}
            {error === "empty" && <ErrorModal error={"Every Field Must Be Filled Out"} setErrorModal={setErrorModal}/>}
            {regError === "error" && <ErrorModal error={"A User With This Username Already Exists"} setErrorModal={setErrorModal}/>}
            {regError === "empty" && <ErrorModal error={"Every Field Must Be Filled Out"} setErrorModal={setErrorModal}/>}
        </div>
    )
};