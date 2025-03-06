import { useState } from "react";

export function useCheckUserFollow() {
    const [isFollowing, setIsFollowing] = useState(null);
    const [loading, setLoading] = useState(true);

    async function check(userId, followUserId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/checkFollow", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "followUserId": followUserId
            })
        });
        const json = await res.json();

        if(json === "error") {
            setLoading(false);
        } else {
            setLoading(false);
            setIsFollowing(json);
        };
    };

    return { check, isFollowing, loading }
};