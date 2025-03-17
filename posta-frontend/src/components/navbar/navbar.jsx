import { LoginNav } from "./loginNav";
import { LogoutNav } from "./logoutNav";

export function Navbar({ currentUser }) {
    return (
        <>
            {currentUser &&
                <LoginNav currentUser={currentUser}/>
            }
            {!currentUser &&
                <LogoutNav/>
            }
        </>
    )
};