import { ProfileContext } from "../../context/profileContext";
import { useContext, useEffect } from "react"
import { useFetchLikes } from "../../hooks/post hooks/useFetchLikes";
import { Post } from "../post components/post";
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { useParams } from "react-router";

export function LikedPosts() {
    const params = useParams();

    const { currentUser } = useContext(ProfileContext);
    const { fetchLikes, likes, likesLoading } = useFetchLikes();
    const { deletePost } = useDeletePost();

    async function deleteFunc(postId, userId) {
        await deletePost(postId, userId);
        await fetchLikes(params.userId);
    };

    useEffect(() => {
        fetchLikes(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!likesLoading && 
            <div className="text-white flex flex-col">
                {likes.likedPosts.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no likes</div>}
                {likes.likedPosts.map((like) => (
                    <div key={like.id}>
                        <Post currentUser={currentUser} post={like} deletePost={deleteFunc}/>
                    </div>
                ))}
            </div>
        }
        </>
    )
};