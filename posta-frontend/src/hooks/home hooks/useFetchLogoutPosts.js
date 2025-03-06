import { useState } from "react";

export function useFetchLogoutPosts() {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchLogoutPosts() {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/logoutPosts", {
            method: "GET"
        });
        const json = await res.json();

        if(json.length > 0) {
            setPosts(json);
            setLoading(false);
        } else {
            setPosts(null);
            setLoading(false);
        };
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchLogoutPosts, posts, loading };
};