import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchLogoutPosts() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchLogoutPosts() {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/logoutPosts", {
                method: "GET"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setPosts(json);
            setLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchLogoutPosts, posts, loading };
};