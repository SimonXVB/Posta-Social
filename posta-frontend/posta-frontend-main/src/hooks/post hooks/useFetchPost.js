import { useState } from "react";

export function useFetchPost() {
    const [post, setPosts] = useState(null);
    const [postLoading, setPostLoading] = useState(true);
    const [postError, setPostError] = useState(null);

    async function fetchPost(postId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/post/${postId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json) {
            setPosts(json);
            setPostLoading(false);
        } else {
            setPosts(null);
            setPostLoading(false);
        };

        if(json === "error") {
            setPostError(json);
            setPosts(null);
            setPostLoading(false);
        };
    };

    return { fetchPost, post, postLoading, postError };
};