import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useLikeComment() {
    const { setError } = useContext(GlobalErrorContext);

    async function likeComment(userId, commentId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/likeComment", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "commentId": commentId
                })
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    async function unlikeComment(userId, commentId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/unlikeComment`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "commentId": commentId
                })
            });
            const json = await res.json();
            
            if(json === "internalError") {
                setError(json);
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { likeComment, unlikeComment }
};