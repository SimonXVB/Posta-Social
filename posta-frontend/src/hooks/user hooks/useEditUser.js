import { useState } from "react";

export function useEditUser() {
    const [editError, setEditError] = useState(null);
    const [edited, setEdited] = useState(null);

    async function editUser(e, currentUserId, username, bio) {
        e.preventDefault();

        const res = await fetch(import.meta.env.VITE_BASE_URL + "/user", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": currentUserId,
                "newUsername": username,
                "bio": bio
            })
        });
        const json = await res.json();

        if(json === "error") {
            setEditError(json);
        };

        if(json === "empty") {
            setEditError(json);
        };

        if(json === "updated") {
            setEdited(json);
        };
    };

    return {editUser, setEditError, editError, edited}
};