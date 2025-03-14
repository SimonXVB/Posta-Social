import { createContext, useState } from "react";

const GlobalErrorContext = createContext();

function GlobalError({ children }) {
    const [error, setError] = useState("");

    return (
        <GlobalErrorContext.Provider value={{error, setError}}>
            {children}
        </GlobalErrorContext.Provider>
    )
};

export { GlobalErrorContext, GlobalError }