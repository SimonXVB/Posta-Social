export function useLikeComment() {

    async function likeComment(userId, commentId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + "/likeComment", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "commentId": commentId
            })
        });
        const json = await res.json();

        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    async function unlikeComment(userId, commentId) {
        const res = await fetch(import.meta.env.VITE_BASE_URL + `/unlikeComment`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                "userId": userId,
                "commentId": commentId
            })
        });
        const json = await res.json();

        
        if(json === "error") {
            alert("An Error Occurred")
        };
    };

    return { likeComment, unlikeComment }
};