import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchAllUsers() {
    const [allUsers, setAllUsers] = useState(null);
    const [allLoading, setAllLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchAll() {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/all`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setAllUsers(json);
            setAllLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchAll, allUsers, allLoading };
};