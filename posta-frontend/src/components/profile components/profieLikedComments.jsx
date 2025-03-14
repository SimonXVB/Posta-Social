import { useEffect, useContext } from "react"
import { useFetchLikedComments } from "../../hooks/comment hooks/useFetchLikedComments";
import { Comment } from "../comment components/comment";
import { useDeleteComment } from "../../hooks/comment hooks/useDeleteComment";
import { useParams } from "react-router";
import { CurrentUserContext } from "../../context/currentUserContext";

export function LikedComments() {
    const params = useParams();

    const { fetchLikedComments, commentLikes, commentLikesLoading } = useFetchLikedComments();
    const { deleteComment } = useDeleteComment();
    const { currentUser } = useContext(CurrentUserContext);

    async function deleteFunction(postId, userId) {
        await deleteComment(postId, userId);
        await fetchLikedComments(params.userId);
    };

    useEffect(() => {
        fetchLikedComments(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!commentLikesLoading && 
            <div className="text-white flex flex-col">
                {commentLikes.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no likes</div>}
                {commentLikes?.map((like) => (
                    <Comment currentUser={currentUser} comment={like} deleteComment={deleteFunction} key={like.id}/>
                ))}
            </div>
        }
        </>
    )
};