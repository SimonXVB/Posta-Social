import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { Login } from "./pages/login";
import { useFetchCurrentUser } from "./hooks/user hooks/useFetchCurrentUser";
import { useEffect } from "react";
import { Profile } from "./pages/profile";
import { NotFound } from "./pages/notFound";
import { CurrentPost } from "./pages/currentPost";
import { CurrentContext } from "./context/currentUserContext";
import { ErrorPopUp } from "./components/individual components/errorPopup";
import { SuccessPopUp } from "./components/individual components/successPopup";
import { Home } from "./pages/home";

export function Router() {
    const { setCurrentUser, fetchCurrentUser, currentUser, currentUserLoading } = useFetchCurrentUser();

    useEffect(() => {
        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <CurrentContext value={{setCurrentUser, fetchCurrentUser, currentUser, currentUserLoading}}>
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<NotFound />}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={!currentUser ? <Login /> : <Navigate to={"/"}/>}/>
                    <Route path="/user/:userId" element={<Profile />}/>
                    <Route path="/post/:postId" element={<CurrentPost />}/>
                </Routes>
            </BrowserRouter>
            <ErrorPopUp/>
            <SuccessPopUp/>
        </CurrentContext>
    )
};