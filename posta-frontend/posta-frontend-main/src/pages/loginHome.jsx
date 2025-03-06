import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/currenUserContext";
import { useFetchFollowingPosts } from "../hooks/home hooks/useFetchFollowingPosts";
import { FollowingPosts } from "../components/home components/homeFollowingPosts";
import { FindModal } from "../components/home components/findModal";

export function LoginHome() {
    const [findModal, setFindModal] = useState(false);

    const { currentUser } = useContext(CurrentUserContext);
    const { fetchFollowingPosts, followingPosts, followingPostsLoading } = useFetchFollowingPosts();

    useEffect(() => {
        fetchFollowingPosts(currentUser.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {followingPostsLoading && <p>Loading...</p>}
            {!followingPostsLoading &&
                <div className="flex justify-center">
                    <div className="flex items-center flex-col font-sans max-w-455 w-full">
                        <div className="border-x-4 border-white min-h-screen w-full">
                            <button className="w-full font-black p-3 bg-white hover:bg-gray-300" onClick={() => setFindModal(true)}>Find New People</button>
                            <FollowingPosts posts={followingPosts}/>
                        </div>
                    </div>
                    {findModal && <FindModal setModal={setFindModal}/>}
                </div>
            }
        </>
    )
};