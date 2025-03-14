import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchLikedPosts() {
    const [postLikes, setPostLikes] = useState(null);
    const [postLikesLoading, setPostLikesLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchLikedPosts(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/likedPosts/${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setPostLikes(json);
            setPostLikesLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchLikedPosts, postLikes, postLikesLoading };
};