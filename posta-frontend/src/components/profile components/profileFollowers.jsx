import { useEffect } from "react";
import { useFetchFollowers } from "../../hooks/follow hooks/useFetchFollowers";
import { Link, useParams } from "react-router";

export function Followers() {
    const parms = useParams();
    
    const { fetchFollowers, followers, followersLoading } = useFetchFollowers();

    useEffect(() => {
        fetchFollowers(parms.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!followersLoading && 
            <div className="text-white">
                {followers.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no followers</div>}
                <div className="max-h-60 overflow-scroll">
                    {followers?.map((follower) => (
                        <Link key={follower.id} className="border-4 border-white font-bold my-2 text-xl p-2 m-2 hover:cursor-pointer flex flex-row items-center justify-between" to={`/user/${follower.id}`}>
                            <p >{"@" + follower.username}</p>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        }
        </>
    )
};