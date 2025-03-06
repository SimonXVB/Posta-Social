import { useState } from "react";

export function useCreateComment() {
    const [createCommentError, setCreateCommentError] = useState(null);

    async function createComment(e, userId, content, postId) {
        e.preventDefault();

        const res = await fetch(import.meta.env.VITE_BASE_URL + "/comment", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "content": content,
                "postId": postId
            })
        });
        const json = await res.json();

        if(json === "error" || json === "empty") {
            setCreateCommentError(json);
        };
    };

    return { createComment, createCommentError, setCreateCommentError }
};