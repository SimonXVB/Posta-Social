import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/currentUserContext";
import { useFetchFollowingPosts } from "../hooks/home hooks/useFetchFollowingPosts";
import { FindModal } from "../components/home components/findModal";
import { useDeletePost } from "../hooks/post hooks/useDeletePost";
import { Post } from "../components/post components/post";
import { useFetchLogoutPosts } from "../hooks/home hooks/useFetchLogoutPosts";
import { CreatePost } from "../components/post components/createPost";
import { Navbar } from "../components/navbar/navbar";

export function Home() {
    const [findModal, setFindModal] = useState(false);

    const { fetchFollowingPosts, followingPosts, followingPostsLoading } = useFetchFollowingPosts();
    const { fetchLogoutPosts, posts, loading } = useFetchLogoutPosts();
    const { currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { deletePost } = useDeletePost();

    async function deleteFunction(post, currentUser) {
        await deletePost(post.id, currentUser.id);
        await fetchFollowingPosts(currentUser.id);
    };

    useEffect(() => {
        async function fetch() {
            if(currentUser) {
                await fetchFollowingPosts(currentUser.id);
            } else {
                await fetchLogoutPosts();
            };
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserLoading]);

    return (
        <div className="h-full flex justify-center">
            <div className="relative flex flex-col max-w-[500px] w-full" id="border">
                <Navbar currentUser={currentUser}/>
                {!currentUserLoading &&
                    <>
                    <button className="w-full font-semibold p-3 bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-500/50 hover:to-red-500/50" onClick={() => setFindModal(true)}>Find new people</button>
                    <div className="overflow-auto mb-4">
                        {currentUser && !followingPostsLoading &&
                            <>
                                {followingPosts.length === 0 && <div className="text-center py-5 text-3xl font-bold text-white">Not following anyone?</div>}
                                {followingPosts?.map((post) => (
                                    <Post currentUser={currentUser} post={post} deletePost={() => deleteFunction(post, currentUser)} key={post.id}/>
                                ))}
                            </>
                        }
                        {!currentUser && !loading &&
                            <>
                                {posts.length === 0 && <div className="text-center py-5 text-3xl font-bold text-white">All empty here</div>}
                                {posts?.map((post) => (
                                    <Post post={post} key={post.id}/>
                                ))}
                            </>
                
                        }
                    </div>
                    </>
                }
                {currentUser && <CreatePost fetchPosts={() => fetchFollowingPosts(currentUser.id)}/>}
                {findModal && <FindModal setModal={setFindModal}/>}
            </div>
        </div>
    )
};