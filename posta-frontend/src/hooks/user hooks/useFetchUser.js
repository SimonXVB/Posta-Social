import { useState } from "react";
import { useNavigate } from "react-router";

export function useFetchUser() {
    const [user, setUser] = useState(null);
    const [userError, setUserError] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const nav = useNavigate();

    async function fetchUser(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/user/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json === "error") {
            setUserError(json);
            setUserLoading(false);
        };

        if(json.username) {
            setUser(json);
            setUserLoading(false);
        } else {
            nav("/notFound");
        };
    };

    return { fetchUser, user, userError, userLoading };
};