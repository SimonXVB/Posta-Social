import { useContext } from "react";
import { GlobalPopupContext } from "../../context/globalPopupContext";

export function useEditUser() {
    const { setError, setSuccess } = useContext(GlobalPopupContext); 

    async function editUser(currentUserId, username, bio) {
        try {
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
            
            if(json === "empty") {
                setError(json);
                return true;
            };

            if(json === "length") {
                setError(json);
                return true;
            };

            if(json === "existsError") {
                setError(json);
                return true;
            };

            if(json === "internalError") {
                setError(json);
                return true;
            };

            setSuccess("editedUser");
        } catch (error) {
            console.error(error);
            setError("fetchError");
            return true;
        };
    };

    return { editUser }
};