export function Fallback() {
    return (
        <div className="w-screen h-screen flex justify-center items-center flex-col">
            <div className="mb-10 mx-2 flex justify-center items-center flex-col text-center">
                <p className="text-2xl font-bold my-5">An error occurred</p>
                <p className="text-2xl font-bold my-5">Please refresh the page</p>
            </div>
        </div>
    )
}