import { useEffect, useContext } from "react"
import { useFetchLikedPosts } from "../../hooks/post hooks/useFetchLikedPosts";
import { Post } from "../post components/post";
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { useParams } from "react-router";
import { CurrentUserContext } from "../../context/currentUserContext";

export function LikedPosts() {
    const params = useParams();

    const { fetchLikedPosts, postLikes, postLikesLoading } = useFetchLikedPosts();
    const { deletePost } = useDeletePost();
    const { currentUser } = useContext(CurrentUserContext);

    async function deleteFunction(postId, userId) {
        await deletePost(postId, userId);
        await fetchLikedPosts(params.userId);
    };

    useEffect(() => {
        fetchLikedPosts(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!postLikesLoading && 
            <>
                {postLikes.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no likes</div>}
                {postLikes?.map((like) => (
                    <Post currentUser={currentUser} post={like} deletePost={() => deleteFunction(like.id, currentUser.id)} key={like.id}/>
                ))}
            </>
        }
        </>
    )
};