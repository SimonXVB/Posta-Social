import { useContext } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useDeletePost() {
    const { setError, setSuccess } = useContext(GlobalPopupContext);

    async function deletePost(postId, userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/post", {
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
                return;
            };

            setSuccess("postDeleted");
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { deletePost };
};