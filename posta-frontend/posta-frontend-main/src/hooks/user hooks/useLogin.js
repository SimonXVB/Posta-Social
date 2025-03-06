import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { CurrentUserContext } from "../../context/currenUserContext";

export function useLogin() {
    const [error, setError] = useState(null);
    const { fetchCurrentUser } = useContext(CurrentUserContext)
    const nav = useNavigate();
    const loc = useLocation();

    async function login(e, username, password) {
        e.preventDefault();

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

        if(json === "login") {
            await fetchCurrentUser();
            nav("/");
        } else {
            setError(json);
        };
    };

    async function logout() {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }); 
        const json = await res.json();

        if(json === "logout") {
            await fetchCurrentUser();
            loc.pathname === "/" ? nav(0) : nav("/");
        };
    };

    return { login, logout, error, setError }
};