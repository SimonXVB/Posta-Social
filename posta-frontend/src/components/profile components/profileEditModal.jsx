import { Input } from "../individual components/input"
import { Button } from "../individual components/button"
import { useEditUser } from "../../hooks/user hooks/useEditUser"
import { useContext, useState } from "react"
import { CurrentUserContext } from "../../context/currentUserContext"

export function EditProfileModal({ setEditModal }) {
    const { fetchCurrentUser, currentUser, currentUserLoading } = useContext(CurrentUserContext);
    const { editUser } = useEditUser();

    const [username, setUsername] = useState(currentUser.username);
    const [bio, setBio] = useState(currentUser.bio);

    async function edit(e) {
        await editUser(e, currentUser.id, username, bio);
        await fetchCurrentUser();
        setEditModal(false);
    };

    return(
        <>
        {!currentUserLoading && currentUser &&
            <div className="fixed top-0 left-0 bg-gray-300 bg-opacity-70 flex justify-center items-center h-screen w-screen">
                <div className="border-4 border-black p-4 bg-white">
                    <p className="text-3xl font-bold">Edit Profile</p>
                    <form onSubmit={e => edit(e)}>
                        <Input name={"Username:"} onChange={e => setUsername(e.target.value)} value={username}/>
                        <Input name={"Bio:"} onChange={e => setBio(e.target.value)} value={bio || ""}/>
                        <Button name={"Save"} type={"submit"}/>
                        <Button name={"Close"} type={"button"} onClick={() => setEditModal(false)}/>
                    </form>
                </div>
            </div>
        }
        </>
    )
};