import { useState } from "react";

export function useFetchFollowingPosts() {
    const [followingPosts, setFollowingPosts] = useState(null);
    const [followingPostsLoading, setFollowingPostsLoading] = useState(true);

    async function fetchFollowingPosts(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/followingPosts/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json && json.length > 0) {
            setFollowingPosts(json);
            setFollowingPostsLoading(false);
        } else {
            setFollowingPosts(null);
            setFollowingPostsLoading(false);
        };
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchFollowingPosts, followingPosts, followingPostsLoading };
};