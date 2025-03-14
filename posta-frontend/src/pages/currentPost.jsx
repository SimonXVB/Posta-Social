import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../hooks/post hooks/useFetchPost"
import { CurrentPostPost } from "../components/current post components/currentPostPost";
import { CurrentUserContext } from "../context/currentUserContext";
import { CurrentPostComment } from "../components/current post components/currentPostComment";
import { useDeleteComment } from "../hooks/comment hooks/useDeleteComment";
import { useCreateComment } from "../hooks/comment hooks/useCreateComment";
import { useFetchPostComments } from "../hooks/comment hooks/useFetchPostComments";

export function CurrentPost() {
    const params = useParams();

    const [commentContent, setCommentContent] = useState("");

    const { fetchPost, post, postLoading } = useFetchPost();
    const { fetchPostComments, comments, commentsLoading } = useFetchPostComments();
    const { currentUser } = useContext(CurrentUserContext);
    const { deleteComment } = useDeleteComment();
    const { createComment } = useCreateComment();

    async function create(e, userId, content, postId) {
        await createComment(e, userId, content, postId);
        await fetchPostComments(postId);
        setCommentContent("");
    };

    async function deleteCommentFunction(commendId, currentUserId) {
        await deleteComment(commendId, currentUserId);
        await fetchPostComments(params.postId);  
    };
    
    useEffect(() => {
        async function fetch() {
            await fetchPost(params.postId);
            await fetchPostComments(params.postId);
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!postLoading &&
            <div className="flex justify-center">
                <div className="font-sans max-w-455 w-full">
                    <div className="border-x-4 border-white min-h-screen w-full">
                        <CurrentPostPost currentUser={currentUser} post={post}/>
                        <div className="flex justify-center flex-col">
                            {currentUser &&
                            <>
                                <form onSubmit={e => create(e, currentUser.id, commentContent, post.id)} className="flex flex-row border-t-2 border-white">
                                    <textarea className="outline-none w-full resize-none h-12" placeholder="New Comment" onChange={e => setCommentContent(e.target.value)} value={commentContent}/>
                                    <button className="hover:bg-orange-600 w-1/2 text-white font-semibold" type="submit">Post</button>
                                </form>
                            </>
                            }
                            <p className="text-center text-xl font-bold py-2 border-y-2 border-white text-white">Comments</p>
                        </div>
                        {!commentsLoading && 
                            <>
                                {comments.length === 0 && <div className="text-center text-2xl font-bold m-5 text-white">Nothing to see here. Yet.</div>}
                                {comments?.map((comment) => (
                                    <CurrentPostComment currentUser={currentUser} comment={comment} deleteComment={() => deleteCommentFunction(comment.id, currentUser.id)} key={comment.id}/>
                                ))}
                            </>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
};