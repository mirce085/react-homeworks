const formDataIntoJSON = formData => {
    const body = {}

    for (const [key, value] of formData) {
        if (Array.isArray(body[key])) {
            body[key].push(value);

            continue;
        }

        if (key in body) {
            body[key] = [body[key], value];

            continue;
        }

        body[key] = value;
    }

    return body;
}

export function Form({children}) {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const json = formDataIntoJSON(formData);
        const regex = new RegExp("/[a-z]{6,16}/");
        if(regex.test(json["username"])) {
            console.log("username approved");
        }
        console.log(json);
    }


    return (
        <form onSubmit={handleSubmit}>
            {children}
        </form>
    )
}