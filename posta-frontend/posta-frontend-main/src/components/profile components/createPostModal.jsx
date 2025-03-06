import { Input } from "../individual components/input"
import { Button } from "../individual components/button"
import { Error } from "../individual components/error"
import { useContext, useEffect, useState } from "react"
import { useCreatePost } from "../../hooks/post hooks/useCreatePost"
import { useParams } from "react-router"
import { ProfileContext } from "../../context/profileContext"

export function CreatePostModal() {
    const params = useParams();

    const [content, setContent] = useState("");
    
    const { currentUser, fetchPosts, setPostModal } = useContext(ProfileContext);
    const { createPost, setError, error, created } = useCreatePost();

    async function create(e) {
        await createPost(e, currentUser.id, content);
        await fetchPosts(params.userId);
    };

    useEffect(() => {
        setTimeout(() => {
            setError(null);
        }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    return(
        <>
            <div className="fixed top-0 left-0 bg-op-purple flex justify-center items-center h-screen w-screen bg-gray-300 bg-opacity-70">
                <div className="border-4 border-black p-4 bg-white">
                    <p className="text-3xl font-bold">New Post</p>
                    <form onSubmit={e => create(e)}>
                        <Input name={"Post:"} onChange={e => setContent(e.target.value)} value={content}/>
                        <Button name={"Post"} type={"submit"}/>
                        <Button name={"Close"} type={"button"} onClick={() => setPostModal(false)}/>
                    </form>
                    {error === "error" && <Error error={"An Error Occurred"}/>}
                    {error === "empty" && <Error error={"Post Field Cannot Be Empty"}/>}
                    {created === "created" && setPostModal(false)}
                </div>
            </div>
        </>
    )
};