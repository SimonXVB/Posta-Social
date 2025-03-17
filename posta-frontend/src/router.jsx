import { BrowserRouter, Routes, Route } from "react-router";
import { Login } from "./pages/login";
import { useFetchCurrentUser } from "./hooks/user hooks/useFetchCurrentUser";
import { useEffect } from "react";
import { Profile } from "./pages/profile";
import { NotFound } from "./pages/notFound";
import { CurrentPost } from "./pages/currentPost";
import { CurrentContext } from "./context/currentUserContext";
import { ErrorPopUp } from "./components/individual components/errorPopup";
import { SuccessPopUp } from "./components/individual components/successPopup";
import { ErrorBoundary } from "./context/errorBoundary";
import { Fallback } from "./pages/fallback";
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
                <ErrorBoundary fallback={<Fallback/>}>
                    <Routes>
                        <Route path="*" element={<NotFound />}/>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/login" element={<Login />}/>
                        <Route path="/user/:userId" element={<Profile />}/>
                        <Route path="/post/:postId" element={<CurrentPost />}/>
                    </Routes>
                </ErrorBoundary>
            </BrowserRouter>
            <ErrorPopUp/>
            <SuccessPopUp/>
        </CurrentContext>
    )
};