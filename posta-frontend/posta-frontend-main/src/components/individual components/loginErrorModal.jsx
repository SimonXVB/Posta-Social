import { Button } from "./button";

export function ErrorModal({ error, setErrorModal }) {

    return(
        <div className="fixed top-0 left-0 bg-op-purple flex justify-center items-center h-screen w-screen bg-gray-300 bg-opacity-70">
            <div className="border-4 border-black p-4 bg-white">
            <div className="bg-red-500 p-2 w-full text-center font-sans font-semibold">
                    <p>{error}</p>
                </div>
                <Button name={"Close"} onClick={() => setErrorModal()}/>
            </div>
        </div>
    )
};