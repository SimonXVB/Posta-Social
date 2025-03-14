import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchUser() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const nav = useNavigate();
    const { setError } = useContext(GlobalErrorContext);

    async function fetchUser(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/user/${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            if(json.username) {
                setUser(json);
                setUserLoading(false);
            } else {
                nav("/notFound");
            };   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchUser, user, userLoading };
};