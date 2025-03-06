import { useState } from "react";

export function useCheckPostLike() {
    const [isLiked, setIsLiked] = useState(null);
    const [loading, setLoading] = useState(true);

    async function check(userId, postId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/checkLikes", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "postId": postId
            })
        });
        const json = await res.json();

        if(json === "error") {
            setLoading(false);
        } else {
            setLoading(false);
            setIsLiked(json);
        };
    };

    return { check, isLiked, loading }
};