import { useContext } from "react";
import { useLocation, useNavigate } from "react-router";
import { CurrentUserContext } from "../../context/currentUserContext";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useLogin() {
    const { setCurrentUser, fetchCurrentUser } = useContext(CurrentUserContext)
    const nav = useNavigate();
    const loc = useLocation();
    const { setError, setSuccess } = useContext(GlobalPopupContext);

    async function login(e, username, password) {
        e.preventDefault();

        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "username": username,
                    "password": password
                }),
                credentials: "include"
            });
            const json = await res.json();

            if(json === "empty") {
                setError(json);
                return true;
            };

            if(json === "noUserError") {
                setError(json);
                return true;
            };

            if(json === "passwordError") {
                setError(json);
                return true;
            };

            if(json === "internalError") {
                setError(json);
                return true;
            };

            setSuccess("login");
            await fetchCurrentUser();
            nav("/");
        } catch (error) {
            console.error(error);
            setError("fetchError");
            return true;
        };
    };

    async function logout() {
        try {
            await fetch(import.meta.env.VITE_BASE_URL + "/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });
    
            setCurrentUser(false);
            loc.pathname === "/" ? nav(0) : nav("/");
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { login, logout }
};