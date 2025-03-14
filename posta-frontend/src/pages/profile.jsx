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

export function Profile() {
    const params = useParams();

    const [activeWindow, setActiveWindow] = useState("posts");
    const [fetchPostsBool, setFetchPostsBool] = useState(false);

    const { currentUser } = useContext(CurrentUserContext);
    const { fetchUser, user, userLoading } = useFetchUser();

    async function fetchAfterPostCreation(currentUserId) {
        if(Number(currentUserId) === Number(params.userId)) {
            if(activeWindow === "posts") {
                setFetchPostsBool(fetchPostsBool === false ? true : false);
            };
        };
    };

    useEffect(() => {
        async function fetch() {
            await fetchUser(params.userId);
            setActiveWindow("posts");   
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <>
            <div className="flex justify-center flex-grow">
                <div className="relative border-x-4 border-white max-w-455 w-full">
                {!userLoading && user &&
                    <>
                        <ProfileHeader user={user}/>
                        <div className="flex overflow-y-scroll text-center text-lg font-semibold border-y-4 border-white *:p-3 *:px-2 *:w-full hover:*:bg-gray-400 text-white">
                            <button onClick={() => setActiveWindow("posts")} style={{backgroundColor: activeWindow === "posts" && "#32a852"}}>Posts</button>
                            <button onClick={() => setActiveWindow("followers")} style={{backgroundColor: activeWindow === "followers" && "#ed1d23"}}>Followers</button>
                            <button onClick={() => setActiveWindow("following")} style={{backgroundColor: activeWindow === "following" && "#ff7e29"}}>Following</button>
                            <button onClick={() => setActiveWindow("comments")} style={{backgroundColor: activeWindow === "comments" && "#fff200"}}>Comments</button>
                            <button onClick={() => setActiveWindow("likes")} style={{backgroundColor: activeWindow === "likes" && "#3e47cc"}}>Likes</button>
                        </div>
                        {activeWindow === "posts" && <Posts fetchPostsBool={fetchPostsBool}/>}
                        {activeWindow === "followers" && <Followers/>}
                        {activeWindow === "following" && <Following/>}
                        {activeWindow === "comments" && <Comments/>}
                        {activeWindow === "likes" && <Likes/>}
                        {currentUser && <CreatePost fetchPosts={() => fetchAfterPostCreation(currentUser.id)}/>}
                    </>
                }
                </div>
            </div>
        </>
    )
}