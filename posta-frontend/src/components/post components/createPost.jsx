import { useState, useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext";
import { useCreatePost } from "../../hooks/post hooks/useCreatePost";

export function CreatePost({ fetchPosts }) {
    const [postModal, setPostModal] = useState(false);
    const [content, setContent] = useState("");

    const { currentUser } = useContext(CurrentUserContext);
    const { createPost } = useCreatePost();

    async function create(e) {
        const error = await createPost(e, currentUser.id, content);

        if(!error) {
            if(fetchPosts) {
                fetchPosts();
            };
            setContent("");
            setPostModal(false);
        };
    };

    return (
        <>
            <button className="absolute bottom-6 right-6 p-2 rounded-full bg-gradient-to-r from-blue-500/50 to-red-500/50 hover:from-blue-500/20 hover:to-red-500/20" onClick={() => setPostModal(true)}>
                <img src="/add.png" alt="add" className="h-10"/>
            </button>
            {postModal && 
                <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-300/30" id="modal">
                    <div className="flex justify-center flex-col max-w-[400px] w-full bg-gray-900 p-6 rounded-lg shadow-lg shadow-blue-500 mx-4">
                        <p className="text-3xl font-bold mb-4">New Post</p>
                        <form onSubmit={e => create(e)}>
                            <textarea onChange={e => setContent(e.target.value)} value={content} className="w-full h-[75px] resize-none bg-transparent outline-none border-b-[1px] border-white/30" placeholder="Post Content"/>
                            <div className="text-sm mb-2">{content.length} / 150</div>
                            <div className="flex *:w-full *:py-2 *:px-6 *:rounded-full *:font-semibold gap-3">
                                <button type="submit" className="bg-blue-500 hover:bg-blue-500/50">Post</button>
                                <button onClick={() => setPostModal(false)} className="bg-red-500 hover:bg-red-500/50">Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </>
    )
};