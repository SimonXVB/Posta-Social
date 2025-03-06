import { createContext } from "react";

const CurrentUserContext = createContext();

function CurrentContext({ children, value }) {
    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
};

export { CurrentUserContext, CurrentContext }