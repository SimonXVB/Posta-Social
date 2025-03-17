import { useEffect } from "react";
import { useFetchFollowers } from "../../hooks/follow hooks/useFetchFollowers";
import { Link, useParams } from "react-router";

export function Followers() {
    const params = useParams();
    
    const { fetchFollowers, followers, followersLoading } = useFetchFollowers();

    useEffect(() => {
        fetchFollowers(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.userId]);

    return (
        <>
        {!followersLoading && 
            <>
                {followers.length === 0 && <div className="text-center py-5 text-3xl font-bold">User has no followers</div>}
                <div className="">
                    {followers?.map((follower) => (
                        <Link key={follower.id} className="border-2 border-white font-semibold text-xl mx-2 my-4 pl-4 p-2 flex flex-row items-center justify-between rounded-full hover:bg-gray-300/30" to={`/user/${follower.id}`}>
                            <p >{follower.username}</p>
                            <button>
                                <img src="/arrow.png" alt="arrow" className="h-7"/>
                            </button>
                        </Link>
                    ))}
                </div>
            </>
        }
        </>
    )
};