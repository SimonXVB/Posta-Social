import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchFollowers() {
    const [followers, setFollowers] = useState(null);
    const [followersLoading, setFollowersLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchFollowers(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/followers/${userId}`, {
                method: "GET"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
            
            setFollowers(json.followedBy);
            setFollowersLoading(false);
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchFollowers, followers, followersLoading };
};