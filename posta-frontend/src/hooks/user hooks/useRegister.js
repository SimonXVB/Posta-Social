import { useLogin } from "./useLogin";
import { GlobalErrorContext } from "../../context/globalErrorContext";
import { useContext } from "react";

export function useRegister() {
    const { login } = useLogin();
    const { setError } = useContext(GlobalErrorContext);

    async function register(e, username, password) {
        e.preventDefault();

        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password,
                }),
                credentials: "include"
            });
            const json = await res.json();

            if(json === "empty") {
                setError(json);
                return true;
            };

            if(json === "internalError") {
                setError(json);
                return true;
            };
    
            login(e, username, password);
        } catch (error) {
            console.error(error);
            setError("fetchError");
            return true;
        };
    };

    return { register };
};