import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchComments() {
    const [comments, setComments] = useState(null);
    const [commentsLoading, setCommentsLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchComments(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/comments/${userId}`, {
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

    return { fetchComments, comments, commentsLoading };
};