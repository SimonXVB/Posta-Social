import { useEffect, useState } from "react";
import { useFetchAllUsers } from "../../hooks/home hooks/useFetchAllUsers";
import { Input } from "../individual components/input";
import { Link } from "react-router";

export function FindModal({ setModal }) {
    const { fetchAll, allUsers, allLoading } = useFetchAllUsers();

    const [searchInput, setSearchInput] = useState("");
    const [filtered, setFiltered] = useState([]);

    function filter(event) {
        setSearchInput(event.target.value);
        setFiltered(allUsers.filter(e => {
            return e.username.toLowerCase().includes(event.target.value.toLowerCase());
        }));
    };

    function returnIsFiltered() {
        return searchInput === "" ? allUsers : filtered;
    };

    useEffect(() => {
        fetchAll();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-300/30">
            <div className="flex justify-center flex-col max-w-[400px] w-full bg-gray-900 p-6 rounded-lg shadow-lg shadow-yellow-500 mx-4">
                <div className="flex justify-between mb-3">
                    <p className="text-2xl font-bold">Discover</p>
                    <button className="hover:bg-gray-300/30 rounded-full aspect-square" onClick={() => setModal(false)}>
                        <img src="/src/assets/close.png" alt="close" className="h-8"/>
                    </button>
                </div>
                {!allLoading &&
                    <div className="mx-2">
                        <Input name={"Search"} onChange={(e) => filter(e)}/>
                        <div className="max-h-80 overflow-auto">
                            {allUsers.length === 0 && <div className="mt-4 text-3xl font-bold text-center">Nobody here</div>}
                            {allUsers.length > 0 && returnIsFiltered().map((user) => (
                                <Link key={user.id} className="border-2 border-white font-semibold text-xl my-4 pl-4 p-2 flex flex-row items-center justify-between rounded-full hover:bg-gray-300/30" to={`/user/${user.id}`}>
                                    <p>{user.username}</p>
                                    <button>
                                        <img src="/src/assets/arrow.png" alt="arrow" className="h-8"/>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};