import { useContext } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFollow() {
    const { setError, setSuccess } = useContext(GlobalPopupContext);

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

            setSuccess("followedUser");
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

            setSuccess("unfollowedUser");
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { follow, unfollow }
};