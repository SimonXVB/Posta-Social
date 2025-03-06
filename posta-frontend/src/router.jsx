import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/login";
import { useFetchCurrentUser } from "./hooks/user hooks/useFetchCurrentUser";
import { useEffect } from "react";
import { Profile } from "./pages/profile";
import { NotFound } from "./pages/notFound";
import { CurrentPost } from "./pages/currentPost";
import { CurrentContext } from "./context/currenUserContext";
import { LoginNav } from "./components/navbar/loginNav";
import { LogoutNav } from "./components/navbar/logoutNav";
import { LoginHome } from "./pages/loginHome";
import { LogoutHome } from "./pages/logoutHome";

export function Router() {
    const { fetchCurrentUser, currentUser, currentUserLoading } = useFetchCurrentUser();

    useEffect(() => {
        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CurrentContext value={{fetchCurrentUser, currentUser, currentUserLoading}}>
            <BrowserRouter>
                {currentUser && <LoginNav currentUser={currentUser}/>}
                {!currentUser && <LogoutNav />}
                <Routes>
                    {!currentUserLoading &&
                    <>
                            <Route path="*" element={<NotFound />}/>
                            <Route path="/" element={currentUser ? <LoginHome /> : <LogoutHome />}/>
                            <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={"/"}/>}/>
                            <Route path="/user/:userId" element={<Profile />}/>
                            <Route path="/post/:postId" element={<CurrentPost />}/>
                    </>
                    }
                </Routes>
            </BrowserRouter>
        </CurrentContext>
    )
};