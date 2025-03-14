import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useCreateComment() {
    const { setError } = useContext(GlobalErrorContext);

    async function createComment(e, userId, content, postId) {
        e.preventDefault();

        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/comment", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "content": content,
                    "postId": postId
                })
            });
            const json = await res.json();

            if(json === "empty") {
                setError(json);
                return true;
            };

            if(json === "internalError") {
                setError(json);
                return true;
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
            return true;
        };
    };

    return { createComment }
};