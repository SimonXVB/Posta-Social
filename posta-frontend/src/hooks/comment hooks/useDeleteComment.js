export function useDeleteComment() {

    async function deleteComment(postId, userId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/comment", {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "id": postId,
                "userId": userId
            })
        });
        const json = await res.json();

        if(json === "error") {
            alert("An Error Occurred")
        };
    };




    return { deleteComment };
};