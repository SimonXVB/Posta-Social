import { Input } from "../individual components/input"
import { useEditUser } from "../../hooks/user hooks/useEditUser"
import { useContext, useState } from "react"
import { CurrentUserContext } from "../../context/currentUserContext"

export function EditProfileModal({ setEditModal, fetchUser, user }) {
    const { currentUser } = useContext(CurrentUserContext);
    const { editUser } = useEditUser();

    const [username, setUsername] = useState(user.username);
    const [bio, setBio] = useState(user.bio);

    async function edit(e) {
        e.preventDefault();
        const error = await editUser(currentUser.id, username, bio);

        if(!error) {
            await fetchUser();
            setEditModal(false);
        };
    };

    return(
        <div className="fixed top-0 left-0 bg-gray-300/30 flex justify-center items-center h-screen w-screen">
            <div className="flex justify-center flex-col max-w-[300px] w-full bg-gray-900 p-6 rounded-lg shadow-lg shadow-orange-500 mx-4" id="modal">
                <p className="text-3xl font-bold">Edit Profile</p>
                <form onSubmit={(e) => edit(e)}>
                    <Input name={"Username:"} onChange={e => setUsername(e.target.value)} value={username}/>
                    <div className="text-sm -translate-y-2">{username.length} / 25</div>
                    <Input name={"Bio:"} onChange={e => setBio(e.target.value)} value={bio}/>
                    <div className="text-sm -translate-y-2">{bio.length} / 50</div>
                    <div className="flex *:w-full *:py-2 *:px-6 *:rounded-full *:font-semibold gap-3">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-500/50">Save</button>
                        <button onClick={() => setEditModal(false)} className="bg-red-500 hover:bg-red-500/50">Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
};