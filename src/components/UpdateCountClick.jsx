export function UpdateCountClick({countClick, setCountClick}) {
    return (
        <button onClick={() => {
            setCountClick(countClick + 1); // actual value
        }}>Click me
        </button>
    )
}