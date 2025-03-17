export function Button({ name, onClick, type }) {
    return(
        <button onClick={onClick} type={type} className="bg-blue-500 py-2 px-4 rounded-3xl w-full">{name}</button>
    )
};