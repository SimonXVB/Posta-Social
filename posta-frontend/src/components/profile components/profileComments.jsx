import { useEffect, useContext } from "react"
import { useFetchComments } from "../../hooks/comment hooks/useFetchComments";
import { Comment } from "../comment components/comment";
import { useDeleteComment } from "../../hooks/comment hooks/useDeleteComment";
import { useParams } from "react-router";
import { CurrentUserContext } from "../../context/currentUserContext";

export function Comments() {
    const params = useParams();
    
    const { fetchComments, comments, commentsLoading } = useFetchComments();
    const { deleteComment } = useDeleteComment();
    const { currentUser } = useContext(CurrentUserContext);

    async function deleteFunction(postId, userId) {
        await deleteComment(postId, userId);
        await fetchComments(params.userId);
    };

    useEffect(() => {
        fetchComments(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!commentsLoading && 
            <>
                {comments.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no comments</div>}
                {comments?.map((comment) => (
                    <Comment currentUser={currentUser} comment={comment} deleteComment={deleteFunction} key={comment.id}/>
                ))}
            </>
        }
        </>
    )
};