import { useState } from "react";

export function useCreatePost() {
    const [error, setError] = useState(null);
    const [created, setCreated] = useState(null);

    async function createPost(e, userId, content) {
        e.preventDefault();

        const res = await fetch(import.meta.env.VITE_BASE_URL + "/post", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "content": content
            })
        });
        const json = await res.json();

        if(json === "error" || json === "empty") {
            setError(json);
        };

        if(json === "created") {
            setCreated(json);
        }
    };

    return { createPost, error, setError, created, setCreated }
};