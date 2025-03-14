import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useLikePost() {
    const { setError } = useContext(GlobalErrorContext); 

    async function likePost(userId, postId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/like", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "postId": postId
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

    async function unlikePost(userId, postId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/unlike`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "postId": postId
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

    return { likePost, unlikePost }
};