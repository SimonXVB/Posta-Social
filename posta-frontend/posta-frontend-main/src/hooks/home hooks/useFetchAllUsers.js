import { useState } from "react";

export function useFetchAllUsers() {
    const [all, setAll] = useState(null);
    const [allLoading, setAllLoading] = useState(true);

    async function fetchAll() {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/all`, {
            method: "GET"
        });
        const json = await res.json();

        if(json.length > 0) {
            setAll(json);
            setAllLoading(false);
        } else {
            setAll(null);
            setAllLoading(false);
        };
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchAll, all, allLoading };
};