import { useContext, useEffect, useRef } from "react"
import { GlobalPopupContext } from "../../context/globalPopupContext"

export function ErrorPopUp() {
    const { setError, error } = useContext(GlobalPopupContext);
    const timeoutRef = useRef();

    const errorObj = {
        "empty" : "Fields cannot be empty",
        "length": "Exceeded character limit",
        "internalError": "Internal Server Error",
        "fetchError": "Failed fetching resource",
        "existsError": "A user with this username already exists",
        "noUserError": "Could not find user",
        "passwordError": "Incorrect password"
    };

    function close() {
        setError(""); 
        clearTimeout(timeoutRef.current);
    };

    useEffect(() => {
        if(error) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setError("");
            }, 8000);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return (
        <>
            {error && 
                <div className="fixed top-4 right-4 p-3 py-2 bg-red-500 flex justify-center items-center rounded-full" id="popup">
                    <p className="font-bold text-xl mr-2">{errorObj[error] || "An error occurred"}</p>
                    <button onClick={close} className="hover:bg-gray-300/30 rounded-full">
                        <img src="/close.png" alt="close" className="h-7"/>
                    </button>
                </div>
            }
        </>
    )
};