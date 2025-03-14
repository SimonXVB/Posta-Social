import { useContext, useState } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useFetchPosts() {
    const [posts, setPosts] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const { setError } = useContext(GlobalErrorContext);

    async function fetchPosts(userId) {
        try {
            const res = await fetch(import.meta.env.VITE_BASE_URL + `/posts/${userId}`, {
                method: "GET",
                credentials: "include"
            });
            const json = await res.json();

            if(json === "internalError") {
                setError(json);
                return;
            };
    
            setPosts(json);
            setPostsLoading(false);   
        } catch (error) {
            console.error(error);
            setError("fetchError");
        };
    };

    return { fetchPosts, posts, postsLoading };
};