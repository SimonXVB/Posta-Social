export function Input({ name, onChange, value, placeholder }) {
    return (
        <div className="flex flex-col m-3 ml-0">
            <label className="font-semibold">{name}</label>
            <input type="text" onChange={onChange} value={value} placeholder={placeholder} className="bg-transparent border-b-4 border-white outline-none"/>
        </ div>
    )
};