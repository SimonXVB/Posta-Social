import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useCreatePost() {
    const { setError } = useContext(GlobalErrorContext);

    async function createPost(e, userId, content) {
        e.preventDefault();

        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/post", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": userId,
                    "content": content
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

    return { createPost }
};