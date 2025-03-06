import { useState } from "react";

export function useFetchComments() {
    const [comments, setComments] = useState(null);
    const [commentsLoading, setCommentsLoading] = useState(true);

    async function fetchComments(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/comments/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json.comments.length > 0) {
            setComments(json.comments);
            setCommentsLoading(false);
        } else {
            setComments(null);
            setCommentsLoading(false);
        };

        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { fetchComments, comments, commentsLoading };
};