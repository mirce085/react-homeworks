import {Checkbox} from "./Checkbox";
import {TextInput} from "./TextInput";

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

export function Form({formStructure, children}) {
    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const json = formDataIntoJSON(formData);
        const regex = new RegExp("^[a-z]{6,16}$");
        console.log(json);
        if(!regex.test(json["username"])) {
            console.log("username not approved");
        }
        if(json["plugins"].length > 3 || json["plugins"].length < 1) {
            console.log("checkboxes not approved");
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            {
                formStructure.map((item, i) => {
                    if(item.type === "checkbox") {
                        return item.children.map((child, j) => (
                            <Checkbox label={child.label} key={i + j} value={child.value} name={item.name} />
                        ))
                    }
                    else if(item.type === "text") {
                        return (
                            <TextInput label={item.label} key={i} name={item.name} />
                        )
                    }
                    return null;
                })
            }
            {children}
        </form>
    )
}