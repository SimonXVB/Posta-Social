import { useContext, useState } from "react";
import { useFollow } from "../../hooks/follow hooks/useFollow";
import { CurrentUserContext } from "../../context/currentUserContext";
import { EditProfileModal } from "./profileEditModal";

export function ProfileHeader({ user }) {
    const [editModal, setEditModal] = useState(false);
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
                    <div className="flex mb-5">
                        <div className="w-1/2 text-xl font-bold p-3 text-white">
                            <p>{"@" + user.username}</p>
                        </div>
                        <div className="w-1/2 text-right *:p-3 *:text-xl *:font-bold *:hover:bg-gray-400 *:border-4 border-white text-white">
                            {currentUser && 
                                <>
                                    {currentUser.id === user.id && <button onClick={() => setEditModal(true)}>Edit</button>}
                                    {currentUser.id !== user.id &&
                                        <>
                                            {!isFollowing && <button onClick={() => followUser(currentUser.id, user.id)}>Follow</button>}
                                            {isFollowing && <button onClick={() => unfollowUser(currentUser.id, user.id)}>Unfollow</button>}
                                        </>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    <div className="my-6 pl-3 break-words text-white">
                        <p className="font-bold">Bio:</p>
                        <p>{user.bio || "---"}</p>
                    </div>
                </>
            }
            {editModal && <EditProfileModal setEditModal={setEditModal}/>}
        </>
    );
}