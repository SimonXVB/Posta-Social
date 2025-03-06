import { useState } from "react";

export function useFetchLikes() {
    const [likes, setLikes] = useState(null);
    const [likesLoading, setLikesLoading] = useState(true);

    async function fetchLikes(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/likes/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json === "error") {
            alert("An Error Occurred")
        };

        if(json) {
            setLikes(json);
            setLikesLoading(false);
        };
    };

    return { fetchLikes, likes, likesLoading };
};