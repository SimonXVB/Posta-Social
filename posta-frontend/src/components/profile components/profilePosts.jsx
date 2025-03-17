import { Post } from "../post components/post";
import { useEffect, useContext } from "react"
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { useParams } from "react-router";
import { useFetchPosts } from "../../hooks/post hooks/useFetchPosts";
import { CurrentUserContext } from "../../context/currentUserContext";

export function Posts({ fetchPostsBool }) {
    const params = useParams();

    const { deletePost } = useDeletePost();
    const { fetchPosts, posts, postsLoading } = useFetchPosts();
    const { currentUser } = useContext(CurrentUserContext);

    async function deleteFunction(postId, userId) {
        await deletePost(postId, userId);
        await fetchPosts(params.userId);
    };

    useEffect(() => {
        async function fetch() {
            await fetchPosts(params.userId);  
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchPostsBool]);

    return (
        <>
        {!postsLoading && 
            <>
                {posts.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no posts</div>}
                {posts?.map((post) => (
                    <Post currentUser={currentUser} post={post} deletePost={() => deleteFunction(post.id, currentUser.id)} key={post.id}/>
                ))}
            </>
        }
        </>
    )
};