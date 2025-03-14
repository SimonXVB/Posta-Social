import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFollow() {
    const { setError } = useContext(GlobalErrorContext);

    async function follow(currentUserId, followUserId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/follow`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": currentUserId,
                    "followUserId": followUserId
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

    async function unfollow(currentUserId, followUserId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + "/unfollow", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "userId": currentUserId,
                    "followUserId": followUserId
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

    return { follow, unfollow }
};