import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useFetchUser } from "../hooks/user hooks/useFetchUser";
import { Followers } from "../components/profile components/profileFollowers";
import { Following } from "../components/profile components/profileFollowing";
import { Posts } from "../components/profile components/profilePosts";
import { Comments } from "../components/profile components/profileComments";
import { Likes } from "../components/profile components/profileLikes";
import { ProfileHeader } from "../components/profile components/profileHeader";
import { CurrentUserContext } from "../context/currentUserContext";
import { CreatePost } from "../components/post components/createPost";
import { Navbar } from "../components/navbar/navbar";
import { EditProfileModal } from "../components/profile components/profileEditModal";

export function Profile() {
    const params = useParams();

    const [activeWindow, setActiveWindow] = useState("posts");
    const [fetchPostsBool, setFetchPostsBool] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { fetchUser, setUserLoading, user, userLoading } = useFetchUser();

    const activeStyle = "border-b-2 border-white";

    function fetchAfterPostCreation(currentUserId) {
        if(Number(currentUserId) === Number(params.userId)) {
            if(activeWindow === "posts") {
                setFetchPostsBool(fetchPostsBool === false ? true : false);
            };
        };
    };

    useEffect(() => {
        setActiveWindow("posts");
        if(!currentUserLoading) {
            async function fetch() {
                setUserLoading(true);
                await fetchUser(params.userId);
            };
            fetch();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.userId, currentUserLoading]);
    
    return (
        <div className="h-full flex justify-center">
            <div className="relative flex flex-col max-w-[500px] w-full" id="border">
                <Navbar currentUser={currentUser}/>
                {!userLoading && user &&
                    <div className="overflow-auto mb-4">
                        <ProfileHeader user={user} setEditModal={setEditModal}/>
                        <div className="flex overflow-y-scroll text-center text-lg font-semibold border-b-[1px] border-white/30 *:py-3 *:px-2 *:w-full hover:*:bg-gray-300/30 text-white">
                            <button onClick={() => setActiveWindow("posts")} className={activeWindow === "posts" ? activeStyle : ""}>Posts</button>
                            <button onClick={() => setActiveWindow("followers")} className={activeWindow === "followers" ? activeStyle : ""}>Followers</button>
                            <button onClick={() => setActiveWindow("following")} className={activeWindow === "following" ? activeStyle : ""}>Following</button>
                            <button onClick={() => setActiveWindow("comments")} className={activeWindow === "comments" ? activeStyle : ""}>Comments</button>
                            <button onClick={() => setActiveWindow("likes")} className={activeWindow === "likes" ? activeStyle : ""}>Likes</button>
                        </div>
                        {activeWindow === "posts" && <Posts fetchPostsBool={fetchPostsBool}/>}
                        {activeWindow === "followers" && <Followers/>}
                        {activeWindow === "following" && <Following/>}
                        {activeWindow === "comments" && <Comments/>}
                        {activeWindow === "likes" && <Likes/>}
                    </div>
                }
                {currentUser && <CreatePost fetchPosts={() => fetchAfterPostCreation(currentUser.id)}/>}
                {editModal && <EditProfileModal setEditModal={setEditModal} fetchUser={() => fetchUser(params.userId)} user={user}/>}
            </div>
        </div>
    )
};