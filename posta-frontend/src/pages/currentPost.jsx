import { useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../hooks/post hooks/useFetchPost"
import { CurrentPostPost } from "../components/current post components/currentPostPost";
import { CurrentUserContext } from "../context/currenUserContext";
import { CurrentPostComments } from "../components/current post components/currentPostComments";
import { useDeleteComment } from "../hooks/comment hooks/useDeleteComment";
import { useCreateComment } from "../hooks/comment hooks/useCreateComment";
import { Error } from "../components/individual components/error";

export function CurrentPost() {
    const params = useParams();

    const [commentContent, setCommentContent] = useState("");

    const { fetchPost, post, postLoading } = useFetchPost();
    const { currentUser } = useContext(CurrentUserContext);
    const { deleteComment } = useDeleteComment();
    const { createComment, createCommentError, setCreateCommentError } = useCreateComment();

    async function create(e, userId, content, postId) {
        await createComment(e, userId, content, postId);
        fetchPost(postId);
        setCommentContent("");
    };

    async function delComment(postId, userId) {
        await deleteComment(postId, userId);
        fetchPost(params.postId);  
    };
    
    useEffect(() => {
        setTimeout(() => {
            setCreateCommentError(null);
        }, 3000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createCommentError]);
    
    useEffect(() => {
        fetchPost(params.postId);
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
                                {createCommentError === "empty" && <Error error={"Comment Cannot Be Empty"}/>}
                                {createCommentError === "error" && <Error error={"An Error Occurred"}/>}
                            </>
                            }
                            <p className="text-center text-xl font-bold py-2 border-y-2 border-white text-white">Comments</p>
                        </div>
                        {post.comments.map((comment) => (
                            <div key={comment.id}>
                                <CurrentPostComments currentUser={currentUser} post={comment} deleteComment={delComment}/>
                            </div>
                        ))}
                        {post.comments.length === 0 && <div className="text-center text-2xl font-bold m-5 text-white">Nothing to see here. Yet.</div>}
                    </div>
                </div>
            </div>
        }
        </>
    )
};