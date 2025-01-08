export function Checkbox({ label, value, name }) {
    return (
        <label>
            <input type="checkbox" name={name} value={value} />
            <span>{label}</span>
        </label>
    )
}