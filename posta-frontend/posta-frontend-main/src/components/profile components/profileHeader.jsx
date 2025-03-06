import { useContext, useEffect } from "react";
import { useFollow } from "../../hooks/follow hooks/useFollow";
import { ProfileContext } from "../../context/profileContext";
import { CurrentUserContext } from "../../context/currenUserContext";
import { useCheckUserFollow } from "../../hooks/follow hooks/useCheckFollow";
import { useParams } from "react-router";

export function ProfileHeader() {
    const params = useParams();

    const { currentUser } = useContext(CurrentUserContext);
    const { user, setEditModal } = useContext(ProfileContext);

    const { follow, unfollow } = useFollow();
    const { check, isFollowing, loading } = useCheckUserFollow();

    async function followUser(currentUserId, userId) {
        await follow(currentUserId, userId);
        check(currentUserId, userId);
    };

    async function unfollowUser(currentUserId, userId) {
        await unfollow(currentUserId, userId);
        check(currentUserId, userId);
    };

    useEffect(() => {
        currentUser && check(currentUser.id, params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
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
                                {!loading &&
                                    <>
                                        {!isFollowing && <button onClick={() => followUser(currentUser.id, user.id)}>Follow</button>}
                                        {isFollowing && <button onClick={() => unfollowUser(currentUser.id, user.id)}>Unfollow</button>}
                                    </>
                                }
                            </>
                            }
                        </>
                    }
                </div>
            </div>
            <div className="my-6 pl-3 break-words text-white">
                <p className="font-bold">Bio:</p>
                <p>{user.bio}</p>
            </div>
        </>
    );
}