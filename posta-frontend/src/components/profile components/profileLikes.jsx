import { useState } from "react"
import { LikedPosts } from "./profileLikedPosts";
import { LikedComments } from "./profieLikedComments";

export function Likes() {
    const [activeWindow, setActiveWindow] = useState("likedPosts");
    const activeStyle = "border-b-2 border-white";

    return (
        <>
            <div className="flex justify-evenly text-lg font-semibold *:p-3 space hover:*:bg-gray-300/30 *:w-full text-white border-b-[1px] border-white/30">
                <button onClick={() => setActiveWindow("likedPosts")} className={activeWindow === "likedPosts" ? activeStyle : ""}>Liked Posts</button>
                <button onClick={() => setActiveWindow("likedComments")} className={activeWindow === "likedComments" ? activeStyle : ""}>LikedComments</button>
            </div>
            <div>
                {activeWindow === "likedPosts" && <LikedPosts/>}
                {activeWindow === "likedComments" && <LikedComments/>}
            </div>
        </>
    )
};