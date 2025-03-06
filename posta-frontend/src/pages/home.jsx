import { LoginHome } from "./loginHome";
import { LogoutHome } from "./logoutHome";
import { useContext } from "react";
import { CurrentUserContext } from "../context/currenUserContext";

export function Home() {
    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);

    return (
        <>
            {!currentUserLoading && currentUser && <LoginHome />}
            {!currentUserLoading && !currentUser && <LogoutHome />}
        </>
    )
}