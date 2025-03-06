
export function useLikePost() {

    async function likePost(userId, postId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/like", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "postId": postId
            })
        });
        const json = await res.json();
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    async function unlikePost(userId, postId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/unlike`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "postId": postId
            })
        });
        const json = await res.json();
        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { likePost, unlikePost }
};