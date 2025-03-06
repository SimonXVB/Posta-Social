import { ProfileContext } from "../../context/profileContext";
import { Post } from "../post components/post";
import { useContext, useEffect } from "react"
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { useParams } from "react-router";

export function Posts() {
    const params = useParams();

    const { currentUser, posts, fetchPosts, postsLoading } = useContext(ProfileContext);
    const { deletePost } = useDeletePost();

    async function deleteFunc(postId, userId) {
        await deletePost(postId, userId);
        await fetchPosts(params.userId);
    };

    useEffect(() => {
        fetchPosts(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
        {!postsLoading && 
            <div className="text-white flex flex-col">
                {!posts && <div className="text-center py-5 text-3xl font-bold">User has no posts</div>}
                {posts && posts.map((post) => (
                    <div key={post.id}>
                        <Post currentUser={currentUser} post={post} deletePost={deleteFunc}/>
                    </div>
                ))}
            </div>
        }
        </>
    )
};