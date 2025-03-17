import { useContext, useState } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useFetchPost() {
    const [post, setPost] = useState(null);
    const [postLoading, setPostLoading] = useState(true);
    const { setError } = useContext(GlobalPopupContext);

    async function fetchPost(postId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/post/${postId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setPost(json[0]);
            setPostLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchPost, post, postLoading };
};