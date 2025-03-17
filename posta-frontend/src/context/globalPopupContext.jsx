import { createContext, useEffect, useState } from "react";

const GlobalPopupContext = createContext();

function GlobalPopup({ children }) {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if(error && success) {
            setError("");
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [success]);

    return (
        <GlobalPopupContext.Provider value={{error, setError, success, setSuccess}}>
            {children}
        </GlobalPopupContext.Provider>
    )
};

export { GlobalPopupContext, GlobalPopup }