import { useState } from "react";

export function useFetchCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserError, setCurrentUserError] = useState(null);
    const [currentUserLoading, setCurrentUserLoading] = useState(true);

    async function fetchCurrentUser() {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/user", {
            method: "GET",
            credentials: "include"
        });
        const json = await res.json();

        if(json === "error") {
            setCurrentUserError(json);
            setCurrentUserLoading(false);
        };

        if(json.username) {
            setCurrentUser(json);
            setCurrentUserLoading(false);
        };
    };

    return { fetchCurrentUser, currentUser, currentUserError, currentUserLoading };
};