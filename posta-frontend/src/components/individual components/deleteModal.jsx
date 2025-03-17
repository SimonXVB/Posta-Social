export function DeleteModal({ setModal, type, deleteFunction }) {
    return (
        <div className="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-gray-300/30" id="modal">
            <div className="flex justify-center items-center flex-col bg-gray-900 p-6 rounded-lg shadow-lg shadow-red-500">
                <p className="text-3xl font-bold mb-4">Delete {type}?</p>
                <form onSubmit={(e) => {e.preventDefault(); deleteFunction()}} className="flex w-full *:w-full *:py-2 *:px-6 *:rounded-full *:font-semibold gap-3">
                    <button type={"submit"} className="bg-blue-500 hover:bg-blue-500/50">Yes</button>
                    <button onClick={() => setModal(false)} className="bg-red-500 hover:bg-red-500/50">No</button>
                </form>
            </div>
        </div>
    )
};