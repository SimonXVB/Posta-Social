import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchFollowing() {
    const [following, setFollowing] = useState(null);
    const [followingLoading, setFollowingLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchFollowing(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/following/${userId}`, {
                method: "GET"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setFollowing(json.following);
            setFollowingLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchFollowing, following, followingLoading };
};