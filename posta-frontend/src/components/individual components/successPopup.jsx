import { useContext, useEffect, useRef } from "react"
import { GlobalPopupContext } from "../../context/globalPopupContext"
import closeImg from "../../assets/close.png";

export function SuccessPopUp() {
    const { setSuccess, success } = useContext(GlobalPopupContext);
    const timeoutRef = useRef();

    const successObj = {
        "followedUser": "Followed User!",
        "unfollowedUser": "Unfollowed User!",
        "commentCreated": "Comment Created!",
        "postCreated" : "Post Created!",
        "commentDeleted": "Comment Deleted",
        "postDeleted": "Post Deleted",
        "editedUser": "Edited Profile",
        "login": "Logged In!"
    };

    useEffect(() => {
        if(success) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setSuccess("");
            }, 8000);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    return (
        <>
            {success && 
                <div className="fixed top-4 right-4 p-3 py-2 bg-green-500 flex justify-center items-center rounded-full">
                    <p className="font-bold text-xl mr-2">{successObj[success] || "Success"}</p>
                    <button onClick={() => {setSuccess(""); clearTimeout(timeoutRef.current)}} className="hover:bg-gray-300/30 rounded-full">
                        <img src={closeImg} alt="close" className="h-7"/>
                    </button>
                </div>
            }
        </>
    )
};