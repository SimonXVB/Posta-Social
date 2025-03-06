import { useState } from "react";

export function useFetchFollowing() {
    const [following, setFollowing] = useState(null);
    const [followingLoading, setFollowingLoading] = useState(true);

    async function fetchFollowing(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/following/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json.following.length > 0) {
            setFollowing(json.following);
            setFollowingLoading(false);
        } else {
            setFollowingLoading(false);
        };

        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchFollowing, following, followingLoading };
};