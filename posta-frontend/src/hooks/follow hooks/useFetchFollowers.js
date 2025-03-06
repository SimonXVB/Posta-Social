import { useState } from "react";

export function useFetchFollowers() {
    const [followers, setFollowers] = useState(null);
    const [followersLoading, setFollowersLoading] = useState(true);

    async function fetchFollowers(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/followers/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json.followedBy.length > 0) {
            setFollowers(json.followedBy);
            setFollowersLoading(false);
        } else {
            setFollowersLoading(false);
        };
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchFollowers, followers, followersLoading };
};