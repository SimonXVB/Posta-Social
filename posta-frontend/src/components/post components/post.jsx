import { Link } from "react-router"
import { useLikePost } from "../../hooks/post hooks/useLikePost";
import { useState } from "react";
import { DeleteModal } from "../individual components/deleteModal";
import { useDateFormat } from "../../hooks/useDateFormat";

export function Post({ currentUser, post, deletePost }) {
    const { likePost, unlikePost } = useLikePost();
    const [isLiked, setIsLiked] = useState(post.isLiked);
    const [delModal, setDelModal] = useState(false);

    const { formatDate } = useDateFormat();

    async function like(userId, postId) {
        await likePost(userId, postId);
        setIsLiked(true);
    };

    async function unlike(userId, postId) {
        await unlikePost(userId, postId);
        setIsLiked(false);
    };

    return (
        <>
            <div className="pt-5 border-b-[1px] border-white/30">
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
                        </>
                    }
                    <Link to={`/post/${post.id}`} className="hover:bg-yellow-500">
                        <img src="/src/assets/comment.png" alt="comment" className="h-6"/>
                    </Link>
                    {currentUser && currentUser.id === post.author.id &&
                        <button onClick={() => setDelModal(true)} className="hover:bg-blue-500">
                            <img src="/src/assets/delete.png" alt="delete" className="h-6"/>
                        </button>
                    }
                </div>
            </div>
            {delModal && <DeleteModal setModal={setDelModal} type={"Post"} deleteFunction={deletePost}/>}
        </>
    )
};