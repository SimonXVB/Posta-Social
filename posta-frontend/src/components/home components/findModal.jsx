import { useEffect } from "react";
import { useFetchAllUsers } from "../../hooks/home hooks/useFetchAllUsers";
import { Button } from "../individual components/button";
import { Link } from "react-router";

export function FindModal({ setModal }) {
    const { fetchAll, allUsers, allLoading } = useFetchAllUsers();

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <>
            <div className="fixed top-0 left-0 bg-gray-300 bg-opacity-70 flex justify-center items-center h-screen w-screen">
                <div className="border-4 border-black p-4 bg-white">
                    <p className="text-3xl font-bold pb-2">Discover new people</p>
                    {!allLoading &&
                        <div className="max-h-80 overflow-scroll">
                            {allUsers.map((user) => (
                                <Link key={user.id} className="border-4 border-black font-bold my-2 text-xl p-2 m-2 ml-0 hover:cursor-pointer flex flex-row items-center justify-between hover:bg-gray-300" to={`/user/${user.id}`}>
                                    <p className="mr-2">{"@" + user.username}</p>
                                    <button>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    }
                    <Button name={"Close"} onClick={() => setModal(false)}/>
                </div>
            </div>
        </>
    )
};