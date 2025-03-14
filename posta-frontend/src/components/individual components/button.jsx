export function Button({ name, onClick, type }) {
    return(
        <button onClick={onClick} type={type} className="m-2 p-1 ml-0 font-mono font-semibold border-4 border-black hover:bg-gray-300">{name}</button>
    )
};