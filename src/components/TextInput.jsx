export function TextInput({label, name}) {
    return (
        <label>
            <input type='text' name={name}/>
            <span>{label}</span>
        </label>
    )
}