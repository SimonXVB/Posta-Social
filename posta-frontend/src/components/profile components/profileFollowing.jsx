import { useEffect } from "react";
import { Link, useParams } from "react-router";
import { useFetchFollowing } from "../../hooks/follow hooks/useFetchFollowing";

export function Following() {
    const params = useParams();
    
    const { fetchFollowing, following, followingLoading } = useFetchFollowing();

    useEffect(() => {
        fetchFollowing(params.userId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
        {!followingLoading && 
            <div className="text-white">
                {following.length === 0 && <div className="text-center py-5 text-3xl font-bold">User is not following anyone</div>}
                <div className="max-h-60 overflow-scroll">
                    {following?.map((following) => (
                        <Link key={following.id} className="border-4 border-white font-bold my-2 text-xl p-2 m-2 hover:cursor-pointer flex flex-row items-center justify-between" to={`/user/${following.id}`}>
                            <p >{"@" + following.username}</p>
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