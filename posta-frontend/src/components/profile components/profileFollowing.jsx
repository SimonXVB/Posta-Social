import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useFetchFollowing } from "../../hooks/follow hooks/useFetchFollowing";

export function Following() {
    const params = useParams();
    
    const { fetchFollowing, following, followingLoading } = useFetchFollowing();

    useEffect(() => {
        fetchFollowing(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.userId]);

    return (
        <>
        {!followingLoading && 
            <>
                {following.length === 0 && <div className="text-center py-5 text-3xl font-bold">User is not following anyone</div>}
                <div className="">
                    {following?.map((follow) => (
                        <Link key={follow.id} className="border-2 border-white font-semibold text-xl mx-2 my-4 pl-4 p-2 flex flex-row items-center justify-between rounded-full hover:bg-gray-300/30" to={`/user/${follow.id}`}>
                            <p >{follow.username}</p>
                            <button>
                                <img src="/src/assets/arrow.png" alt="arrow" className="h-7"/>
                            </button>
                        </Link>
                    ))}
                </div>
            </>
        }
        </>
    )
};