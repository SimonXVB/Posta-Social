import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/currentUserContext";
import { useFetchFollowingPosts } from "../hooks/home hooks/useFetchFollowingPosts";
import { FindModal } from "../components/home components/findModal";
import { useDeletePost } from "../hooks/post hooks/useDeletePost";
import { Post } from "../components/post components/post";
import { useFetchLogoutPosts } from "../hooks/home hooks/useFetchLogoutPosts";
import { CreatePost } from "../components/post components/createPost";

export function Home() {
    const [findModal, setFindModal] = useState(false);

    const { currentUser } = useContext(CurrentUserContext);
    const { fetchFollowingPosts, followingPosts, followingPostsLoading } = useFetchFollowingPosts();
    const { fetchLogoutPosts, posts, loading } = useFetchLogoutPosts();
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
    }, []);

    return (
        <div className="flex justify-center flex-grow">
            <div className="relative border-x-4 border-white max-w-[455px] w-full">
                <button className="w-full font-black p-3 bg-white hover:bg-gray-300" onClick={() => setFindModal(true)}>Discover new people</button>
                {currentUser && !followingPostsLoading &&
                    <div className="flex flex-col">
                        {followingPosts.length === 0 && <div className="text-center py-5 text-3xl font-bold text-white">Nothing to see here</div>}
                        {followingPosts?.map((post) => (
                            <Post currentUser={currentUser} post={post} deletePost={() => deleteFunction(post, currentUser)} key={post.id}/>
                        ))}
                    </div>
                }
                {!currentUser && !loading &&
                    <div className="flex flex-col">
                        {posts.length === 0 && <div className="text-center py-5 text-3xl font-bold text-white">Nothing to see here</div>}
                        {posts?.map((post) => (
                            <Post post={post} key={post.id}/>
                        ))}
                    </div>
                }
                {currentUser && <CreatePost fetchPosts={() =>  fetchFollowingPosts(currentUser.id)}/>}
            </div>
            {findModal && <FindModal setModal={setFindModal}/>}
        </div>
    )
};