import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchFollowingPosts() {
    const [followingPosts, setFollowingPosts] = useState(null);
    const [followingPostsLoading, setFollowingPostsLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchFollowingPosts(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/followingPosts/${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setFollowingPosts(json);
            setFollowingPostsLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchFollowingPosts, followingPosts, followingPostsLoading };
};