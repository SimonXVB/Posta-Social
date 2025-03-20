import { useNavigate, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { useFetchPost } from "../hooks/post hooks/useFetchPost"
import { CurrentUserContext } from "../context/currentUserContext";
import { useDeleteComment } from "../hooks/comment hooks/useDeleteComment";
import { useDeletePost } from "../hooks/post hooks/useDeletePost";
import { useCreateComment } from "../hooks/comment hooks/useCreateComment";
import { useFetchPostComments } from "../hooks/comment hooks/useFetchPostComments";
import { Navbar } from "../components/navbar/navbar";
import { Post } from "../components/post components/post";
import { Comment } from "../components/comment components/comment";

export function CurrentPost() {
    const params = useParams();
    const nav = useNavigate();

    const [commentContent, setCommentContent] = useState("");

    const { fetchPostComments, comments, commentsLoading } = useFetchPostComments();
    const { fetchPost, post, postLoading } = useFetchPost();
    const { currentUser } = useContext(CurrentUserContext);
    const { deleteComment } = useDeleteComment();
    const { createComment } = useCreateComment();
    const { deletePost } = useDeletePost();

    async function create(e, userId, content, postId) {
        const error = await createComment(e, userId, content, postId);

        if(!error) {
            await fetchPostComments(postId);
            setCommentContent("");
        };
    };

    async function deleteCurrentPost() {
        await deletePost(post.id, currentUser.id); 
        nav("/");
    };

    async function deleteCurrentComment(commendId, currentUserId) {
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
            <div className="h-full flex justify-center">
                <div className="relative flex flex-col max-w-[500px] w-full" id="border">
                    <Navbar currentUser={currentUser}/>
                    <div className="overflow-auto">
                        <Post currentUser={currentUser} post={post} deletePost={deleteCurrentPost}/>
                        {currentUser &&
                            <div className="pb-5">
                                <form onSubmit={e => create(e, currentUser.id, commentContent, post.id)} className="p-5 pb-0 flex flex-row border-t-[1px] border-white/30">
                                    <input className="outline-none bg-transparent text-xl py-2 w-full" placeholder="New Comment" onChange={e => setCommentContent(e.target.value)} value={commentContent}/>
                                    <button className="bg-gradient-to-r from-blue-500 to-red-500 hover:from-blue-500/50 hover:to-red-500/50 w-1/2 text-white font-semibold ml-4 rounded-full" type="submit">Post</button>
                                </form>
                                <div className="text-sm pl-5">{commentContent.length} / 150</div>
                            </div>
                        }
                        <p className="pl-5 text-xl py-3 font-semibold bg-gradient-to-r from-blue-500 to-red-500">Comments</p>
                        {!commentsLoading &&
                            <div className="px-4 mb-4">
                                {comments.length === 0 && <div className="text-center text-2xl font-bold m-5 text-white">Nothing to see here</div>}
                                {comments?.map((comment) => (
                                    <Comment currentUser={currentUser} comment={comment} deleteComment={deleteCurrentComment} key={comment.id}/>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        }
        </>
    )
};