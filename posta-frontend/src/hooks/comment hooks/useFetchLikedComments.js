import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchLikedComments() {
    const [commentLikes, setCommentLikes] = useState(null);
    const [commentLikesLoading, setCommentLikesLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchLikedComments(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/likedComments/${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setCommentLikes(json);
            setCommentLikesLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchLikedComments, commentLikes, commentLikesLoading };
};