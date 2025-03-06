export function Error({ error }) {
    return (
        <div className="bg-red-500 p-2 w-full text-center font-sans font-semibold">
            <p>{error}</p>
        </div>
    )
};