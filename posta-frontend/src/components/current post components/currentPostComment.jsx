import { useState } from "react";
import { useLikeComment } from "../../hooks/comment hooks/useLikeComment";
import { Link } from "react-router";
import { DeleteModal } from "../individual components/deleteModal";
import { useDateFormat } from "../../hooks/useDateFormat";

export function CurrentPostComment({ currentUser, comment, deleteComment }) {
    const { likeComment, unlikeComment } = useLikeComment();
    const { formatDate } = useDateFormat();

    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [delModal, setDelModal] = useState(false);

    async function like(userId, commentId) {
        await likeComment(userId, commentId);
        setIsLiked(true);
    };

    async function unlike(userId, commentId) {
        await unlikeComment(userId, commentId);
        setIsLiked(false);
    };

    return (
        <>
            <div className="pt-5 border-b-2 border-white/30">
                <div className="px-5">
                    <div className="flex justify-between text-lg font-semibold">
                        <Link to={`/user/${comment.author.id}`} className="hover:underline">
                            <p className="">{comment.author.username}</p>
                        </Link>
                        <p>{formatDate(comment.date)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-500 to-blue-500 h-1"></div>
                    <div className="break-words pb-2 pt-3">
                        <p>{comment.content}</p>
                    </div>
                </div>
                <div className="flex *:px-3 *:py-2 *:flex *:justify-center *:w-full">
                {currentUser && 
                        <>
                            {isLiked &&
                                <button onClick={() => unlike(currentUser.id, comment.id)} className="hover:bg-red-500">
                                    <img src="/unlike.png" alt="unlike" className="h-6"/>
                                </button>
                            }
                            {!isLiked &&
                                <button onClick={() => like(currentUser.id, comment.id)} className="hover:bg-red-500">
                                    <img src="/like.png" alt="like" className="h-6"/>
                                </button>
                            }
                            {currentUser.id === comment.author.id &&
                            <button onClick={() => setDelModal(true)} className="hover:bg-blue-500">
                                <img src="/delete.png" alt="delete" className="h-6"/>
                            </button>
                            }
                        </>
                    }
                </div>
            </div>
            {delModal && <DeleteModal setModal={setDelModal} type={"Comment"} deleteFunction={deleteComment}/>}
        </>
    )
};