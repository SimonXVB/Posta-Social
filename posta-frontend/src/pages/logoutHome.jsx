import { useEffect } from "react";
import { FollowingPosts } from "../components/home components/homeFollowingPosts";
import { useFetchLogoutPosts } from "../hooks/home hooks/useFetchLogoutPosts";

export function LogoutHome() {
    const { fetchLogoutPosts, posts, loading } = useFetchLogoutPosts();

    useEffect(() => {
        fetchLogoutPosts();   
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {loading && <p>Loading...</p>}
            {!loading &&
                <div className="flex justify-center">
                    <div className="max-w-455 w-full">
                        <div className="border-x-4 border-white min-h-screen w-full">
                            <FollowingPosts posts={posts}/>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}