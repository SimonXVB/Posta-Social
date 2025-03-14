import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useDeleteComment() {
    const { setError } = useContext(GlobalErrorContext);

    async function deleteComment(postId, userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/comment", {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "id": postId,
                    "userId": userId
                })
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
        }
    };

    return { deleteComment };
};