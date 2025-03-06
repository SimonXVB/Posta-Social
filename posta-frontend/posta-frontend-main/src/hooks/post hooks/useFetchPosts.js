import { useState } from "react";

export function useFetchPosts() {
    const [posts, setPosts] = useState(null);
    const [postsLoading, setPostsLoading] = useState(true);
    const [postsError, setPostsError] = useState(null);

    async function fetchPosts(userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/posts/${userId}`, {
            method: "GET"
        });
        const json = await res.json();

        if(json && json.posts.length > 0) {
            setPosts(json.posts);
            setPostsLoading(false);
        } else {
            setPosts(null);
            setPostsLoading(false);
        };

        if(json === "error") {
            setPostsError(json);
            setPosts(null);
            setPostsLoading(false);
        };
    };

    return { fetchPosts, setPostsLoading, posts, postsLoading, postsError };
};