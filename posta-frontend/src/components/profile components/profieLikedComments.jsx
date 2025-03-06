import { ProfileContext } from "../../context/profileContext";
import { useContext, useEffect } from "react"
import { useFetchLikes } from "../../hooks/post hooks/useFetchLikes";
import { Comment } from "../comment components/comment";
import { useDeleteComment } from "../../hooks/comment hooks/useDeleteComment";
import { useParams } from "react-router";

export function LikedComments() {
    const params = useParams();
    
    const { currentUser } = useContext(ProfileContext);
    const { fetchLikes, likes, likesLoading } = useFetchLikes();
    const { deleteComment } = useDeleteComment();

    async function deleteFunc(postId, userId) {
        await deleteComment(postId, userId);
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
                {likes.likedComments.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no likes</div>}
                {likes.likedComments.map((like) => (
                    <div key={like.id}>
                        <Comment currentUser={currentUser} post={like} deleteComment={deleteFunc}/>
                    </div>
                ))}
            </div>
        }
        </>
    )
};