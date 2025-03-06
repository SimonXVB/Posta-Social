import { createContext } from "react";

const ProfileContext = createContext();

function ProfContext({ children, value }) {
    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    )
};

export { ProfileContext, ProfContext }