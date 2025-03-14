import { useContext } from "react";
import { GlobalErrorContext } from "../../context/globalErrorContext";

export function useEditUser() {
    const { setError } = useContext(GlobalErrorContext); 

    async function editUser(e, currentUserId, username, bio) {
        e.preventDefault();

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

            if(json === "internalError") {
                setError(json);
                return true;
            };
        } catch (error) {
            console.error(error);
            setError("fetchError");
            return true;
        };
    };

    return { editUser }
};