import { Link } from "react-router"
import { useLikeComment } from "../../hooks/comment hooks/useLikeComment";
import { useState } from "react";

export function Comment({ currentUser, comment, deleteComment }) {
    const [isLiked, setIsLiked] = useState(comment.isLiked);
    const { likeComment, unlikeComment } = useLikeComment();

    async function like(userId, commentId) {
        await likeComment(userId, commentId);
        setIsLiked(true);
    };

    async function unlike(userId, commentId) {
        await unlikeComment(userId, commentId);3
        setIsLiked(false);
    };

    return (
        <div className="px-5 pt-5 border-b-2 border-white text-white">
            <Link to={`/user/${comment.author.id}`}>
                <p className="text-lg font-bold border-b-2 border-white cursor-pointer">{"@" + comment.author.username}</p>
            </Link>
            <div className="break-words pb-2 pt-3">
                <p>{comment.content}</p>
            </div>
            <div className="flex *:px-3 *:py-2 *:flex *:justify-center *:w-full">
                {currentUser && 
                    <>
                    {isLiked &&
                        <button onClick={() => unlike(currentUser.id, comment.id)} className="hover:bg-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
                        </button>
                    }
                    {!isLiked &&
                        <button onClick={() => like(currentUser.id, comment.id)} className="hover:bg-red-600">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z"/></svg>
                        </button>
                    }
                    </>
                }
                <Link to={`/post/${comment.postId}`} className="hover:bg-yellow-600">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z"/></svg>
                </Link>
                {currentUser && currentUser.id === comment.author.id &&
                    <button onClick={() => deleteComment(comment.id, currentUser.id)} className="hover:bg-blue-600">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </button>
                }
            </div>
        </div>
    )
};