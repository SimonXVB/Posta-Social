import { Link } from "react-router"
import { useLikeComment } from "../../hooks/comment hooks/useLikeComment";
import { useState } from "react";
import { DeleteModal } from "../individual components/deleteModal";
import { useDateFormat } from "../../hooks/useDateFormat";
import { useLocation } from "react-router";
import likeImg from "../../assets/like.png";
import unlikeImg from "../../assets/unlike.png";
import commentImg from "../../assets/comment.png";
import deleteImg from "../../assets/delete.png";

export function Comment({ currentUser, comment, deleteComment }) {
    const loc = useLocation();

    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const [delModal, setDelModal] = useState(false);

    const { likeComment, unlikeComment } = useLikeComment();
    const { formatDate } = useDateFormat();

    async function like(userId, commentId) {
        await likeComment(userId, commentId);
        setIsLiked(true);
    };

    async function unlike(userId, commentId) {
        await unlikeComment(userId, commentId);3
        setIsLiked(false);
    };

    return (
        <>
            <div className="pt-5 border-b-[1px] border-white/30">
                <div className="px-5">
                    <div className="flex justify-between text-lg font-semibold">
                        <Link to={`/user/${comment.author.id}`} className="hover:underline">
                            <p className="">{comment.author.username}</p>
                        </Link>
                        <p>{formatDate(comment.date)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-red-500 h-1"></div>
                    <div className="break-words pb-2 pt-3">
                        <p>{comment.content}</p>
                    </div>
                </div>
                <div className="flex *:px-3 *:py-2 *:flex *:justify-center *:w-full">
                    {currentUser &&
                        <>
                            {isLiked &&
                                <button onClick={() => unlike(currentUser.id, comment.id)} className="hover:bg-red-500">
                                    <img src={unlikeImg} alt="unlike" className="h-6"/>
                                </button>
                            }
                            {!isLiked &&
                                <button onClick={() => like(currentUser.id, comment.id)} className="hover:bg-red-500">
                                    <img src={likeImg} alt="like" className="h-6"/>
                                </button>
                            }
                        </>
                    }
                    {loc.pathname.split("/")[1] !== "post" &&
                        <Link to={`/post/${comment.postId}`} className="hover:bg-yellow-500">
                            <img src={commentImg} alt="comment" className="h-6"/>
                        </Link>
                    }
                    {currentUser && currentUser.id === comment.author.id &&
                        <button onClick={() => setDelModal(true)} className="hover:bg-blue-500">
                            <img src={deleteImg} alt="delete" className="h-6"/>
                        </button>
                    }
                </div>
            </div>
            {delModal && <DeleteModal setModal={setDelModal} type={"Comment"} deleteFunction={() => deleteComment(comment.id, currentUser.id)}/>}
        </>
    )
};