import { useState, useContext } from "react";
import { CurrentUserContext } from "../../context/currentUserContext";
import { Button } from "../individual components/button";
import { Input } from "../individual components/input"
import { useCreatePost } from "../../hooks/post hooks/useCreatePost";

export function CreatePost({ fetchPosts }) {
    const [postModal, setPostModal] = useState(false);
    const [content, setContent] = useState("");

    const { currentUser } = useContext(CurrentUserContext);
    const { createPost } = useCreatePost();

    async function create(e) {
        await createPost(e, currentUser.id, content);
        if(fetchPosts) {
            fetchPosts();
        };
        setContent("");
        setPostModal(false);
    };

    return (
        <>
            <button className="absolute bottom-6 right-6 w-7 aspect-square bg-green-400" onClick={() => setPostModal(true)}>+</button>
            {postModal && 
                <div className="fixed top-0 left-0 bg-op-purple flex justify-center items-center h-screen w-screen bg-gray-300 bg-opacity-70">
                    <div className="border-4 border-black p-4 bg-white">
                        <p className="text-3xl font-bold">New Post</p>
                        <form onSubmit={e => create(e)}>
                            <Input name={"Post:"} onChange={e => setContent(e.target.value)} value={content}/>
                            <Button name={"Post"} type={"submit"}/>
                            <Button name={"Close"} type={"button"} onClick={() => setPostModal(false)}/>
                        </form>
                    </div>
                </div>
            }
        </>
    )
};