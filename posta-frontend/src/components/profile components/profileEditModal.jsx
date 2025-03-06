import { Input } from "../individual components/input"
import { Button } from "../individual components/button"
import { Error } from "../individual components/error"
import { useEditUser } from "../../hooks/user hooks/useEditUser"
import { useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../context/profileContext"
import { CurrentUserContext } from "../../context/currenUserContext"

export function EditProfileModal() {
    const { setEditModal } = useContext(ProfileContext);
    const { fetchCurrentUser, currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { editUser, setEditError, editError, edited} = useEditUser();

    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);

    async function edit(e) {
        await editUser(e, currentUser.id, username, bio);
        await fetchCurrentUser();
    };

    useEffect(() => {
        setTimeout(() => {
            setEditError(null);
        }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editError]);

    return(
        <>
        {!currentUserLoading && currentUser &&
            <div className="fixed top-0 left-0 bg-gray-300 bg-opacity-70 flex justify-center items-center h-screen w-screen">
                <div className="border-4 border-black p-4 bg-white">
                    <p className="text-3xl font-bold">Edit Profile</p>
                    <form onSubmit={e => edit(e)}>
                        <Input name={"Username:"} onChange={e => setUsername(e.target.value)} value={username}/>
                        <Input name={"Bio:"} onChange={e => setBio(e.target.value)} value={bio}/>
                        <Button name={"Save"} type={"submit"}/>
                        <Button name={"Close"} type={"button"} onClick={() => setEditModal(false)}/>
                    </form>
                    {editError === "error" && <Error error={"A User With This Username Already Exists"}/>}
                    {editError === "empty" && <Error error={"Every Field Must Be Filled Out"}/>}
                    {edited === "updated" && setEditModal(false)}
                </div>
            </div>
        }
        </>
    )
};