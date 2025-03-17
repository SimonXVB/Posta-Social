import { Link, useNavigate } from "react-router"
import { useLikePost } from "../../hooks/post hooks/useLikePost";
import { useDeletePost } from "../../hooks/post hooks/useDeletePost";
import { DeleteModal } from "../individual components/deleteModal";3
import { useDateFormat } from "../../hooks/useDateFormat";
import { useState } from "react";

export function CurrentPostPost({ currentUser, post }) {
    const nav = useNavigate();

    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [delModal, setDelModal] = useState(false);

    const { likePost, unlikePost } = useLikePost();
    const { deletePost } = useDeletePost();
    const { formatDate } = useDateFormat();

    async function deleteCurrentPost() {
        await deletePost(post.id, currentUser.id); 
        nav("/");
    };

    async function like(userId, commentId) {
        await likePost(userId, commentId);
        setIsLiked(true);
    };

    async function unlike(userId, commentId) {
        await unlikePost(userId, commentId);
        setIsLiked(false);
    };

    return (
        <>
            <div className="pt-5 text-white">
                <div className="px-5">
                    <div className="flex justify-between text-lg font-semibold">
                        <Link to={`/user/${post.author.id}`} className="hover:underline">
                            <p className="">{post.author.username}</p>
                        </Link>
                        <p>{formatDate(post.date)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-red-500 h-1"></div>
                    <div className="break-words pb-2 pt-3">
                        <p>{post.content}</p>
                    </div>
                </div>
                <div className="flex *:px-3 *:py-2 *:flex *:justify-center *:w-full">
                    {currentUser && 
                        <>
                            {isLiked &&
                                <button onClick={() => unlike(currentUser.id, post.id)} className="hover:bg-red-500">
                                    <img src="/src/assets/unlike.png" alt="unlike" className="h-6"/>
                                </button>
                            }
                            {!isLiked &&
                                <button onClick={() => like(currentUser.id, post.id)} className="hover:bg-red-500">
                                    <img src="/src/assets/like.png" alt="like" className="h-6"/>
                                </button>
                            }
                            {currentUser.id === post.author.id &&
                            <button onClick={() => setDelModal(true)} className="hover:bg-blue-500">
                                <img src="/src/assets/delete.png" alt="delete" className="h-6"/>
                            </button>
                            }
                        </>
                    }
                </div>
            </div>
            {delModal && <DeleteModal setModal={setDelModal} type={"Post"} deleteFunction={deleteCurrentPost}/>}
        </>
    )
};