import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchUser } from "../hooks/user hooks/useFetchUser";
import { EditProfileModal } from "../components/profile components/profileEditModal";
import { Followers } from "../components/profile components/profileFollowers";
import { Following } from "../components/profile components/profileFollowing";
import { Posts } from "../components/profile components/profilePosts";
import { Comments } from "../components/profile components/profileComments";
import { Likes } from "../components/profile components/profileLikes";
import { CurrentUserContext } from "../context/currenUserContext";
import { ProfileHeader } from "../components/profile components/profileHeader";
import { CreateButton } from "../components/individual components/createButton";
import { CreatePostModal } from "../components/profile components/createPostModal"
import { useFetchPosts } from "../hooks/post hooks/useFetchPosts";
import { ProfContext } from "../context/profileContext";

export function Profile() {
    const params = useParams();

    const [editModal, setEditModal] = useState(false);
    const [postModal, setPostModal] = useState(false);
    const [activeWindow, setActiveWindow] = useState("posts");

    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { fetchUser, user, userLoading } = useFetchUser();
    const { fetchPosts, posts, postsLoading } = useFetchPosts();

    useEffect(() => {
        async function fetch() {
            await fetchUser(params.userId);
            await fetchPosts(params.userId);
            setActiveWindow("posts");   
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <>
            {!userLoading && !currentUserLoading && user &&
            <ProfContext value={{ user, userLoading, editModal, currentUser, posts, postsLoading, fetchPosts, fetchUser, setEditModal, setPostModal }}>
                <div className="flex items-center flex-col font-sans">
                    <div className="border-x-4 border-white max-w-455 w-full min-h-screen">
                        <ProfileHeader/>
                        <div className="flex overflow-scroll text-center text-lg font-semibold border-y-4 border-white *:p-3 *:px-2 *:w-full hover:*:bg-gray-400 text-white">
                            <button onClick={() => setActiveWindow("posts")} style={{backgroundColor: activeWindow === "posts" && "#32a852"}}>Posts</button>
                            <button onClick={() => setActiveWindow("followers")} style={{backgroundColor: activeWindow === "followers" && "#ed1d23"}}>Followers</button>
                            <button onClick={() => setActiveWindow("following")} style={{backgroundColor: activeWindow === "following" && "#ff7e29"}}>Following</button>
                            <button onClick={() => setActiveWindow("comments")} style={{backgroundColor: activeWindow === "comments" && "#fff200"}}>Comments</button>
                            <button onClick={() => setActiveWindow("likes")} style={{backgroundColor: activeWindow === "likes" && "#3e47cc"}}>Likes</button>
                        </div>
                        {activeWindow === "posts" && <Posts/>}
                        {activeWindow === "followers" && <Followers/>}
                        {activeWindow === "following" && <Following/>}
                        {activeWindow === "comments" && <Comments/>}
                        {activeWindow === "likes" && <Likes/>}
                    </div>
                    {currentUser && <CreateButton name={"Create Post"} onClick={() => setPostModal(true)}/>}
                </div>
                {editModal && <EditProfileModal/>}
                {postModal && <CreatePostModal/>}
            </ProfContext>
            }
        </>
    )
}