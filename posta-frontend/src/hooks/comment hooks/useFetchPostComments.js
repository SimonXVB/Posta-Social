import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchPostComments() {
    const [comments, setComments] = useState(null);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchPostComments(postId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/postComments/${postId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };

            setComments(json);
            setCommentsLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchPostComments, comments, commentsLoading };
};