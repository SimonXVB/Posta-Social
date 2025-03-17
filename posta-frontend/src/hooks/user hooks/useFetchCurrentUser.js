import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchCurrentUser() {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserLoading, setCurrentUserLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchCurrentUser() {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/user", {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                setCurrentUserLoading(false);
                return;
            };
    
            if(json.username) {
                setCurrentUser(json);
                setCurrentUserLoading(false);
            } else {
                setCurrentUserLoading(false);
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
            setCurrentUserLoading(false);
        };
    };

    return { setCurrentUser, fetchCurrentUser, currentUser, currentUserLoading };
};