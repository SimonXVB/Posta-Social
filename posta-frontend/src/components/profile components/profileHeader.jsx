import { useContext, useState } from "react";
import { useFollow } from "../../hooks/follow hooks/useFollow";
import { CurrentUserContext } from "../../context/currentUserContext";

export function ProfileHeader({ user, setEditModal }) {
    const [isFollowing, setIsFollowing] = useState(user.isFollowing)

    const { currentUser } = useContext(CurrentUserContext);

    const { follow, unfollow } = useFollow();

    async function followUser(currentUserId, userId) {
        await follow(currentUserId, userId);
        setIsFollowing(true);
    };

    async function unfollowUser(currentUserId, userId) {
        await unfollow(currentUserId, userId);
        setIsFollowing(false);
    };

    return (
        <>
            {user &&
                <>
                    <div className="flex items-center mx-4 pb-2">
                        <div className="w-1/2 text-2xl font-bold text-white">
                            <p>{user.username}</p>
                        </div>
                        <div className="w-1/2 text-right *:px-4 *:py-2 *:text-xl *:font-bold *:rounded-full *:underline text-white">
                            {currentUser &&
                                <>
                                    {currentUser.id === user.id && <button onClick={() => setEditModal(true)} className="hover:bg-gray-300/30">Edit</button>}
                                    {currentUser.id !== user.id &&
                                        <>
                                            {!isFollowing && <button onClick={() => followUser(currentUser.id, user.id)} className="hover:bg-gray-300/30">Follow</button>}
                                            {isFollowing && <button onClick={() => unfollowUser(currentUser.id, user.id)} className="hover:bg-gray-300/30">Unfollow</button>}
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-red-500 h-1 mx-4"></div>
                    <div className="my-6 px-4 break-words text-white">
                        <p className="font-bold">Bio:</p>
                        <p>{user.bio}</p>
                    </div>
                </>
            }
        </>
    );
}