export function CreateButton({ name, onClick }) {
    return (
        <div className="bottom-0 bg-white fixed p-3 text-center font-bold cursor-pointer max-w-455 w-full hover:bg-gray-300" onClick={onClick}>
            <p>{name}</p>
        </div>
    )
};