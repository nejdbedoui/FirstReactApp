import { useMemo } from "react";
import {useState} from "react"

export default function MemoExample() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const security = useMemo( () => {
        setTimeout(() => {
            console.log("security Check !")
        }, 0);
        return password.length > 3
    })
    return (
        <>
            <h1>MeMo Example</h1>
            <input type="text"
                   name="username"
                   id="username"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}/>
            <br/>
            <input type="text"
                   name="password"
                   id="password"
                   value={password}
                   onChange={(e) => {
                       setPassword(e.target.value);
                       security;
                   }}
                   style={security ? {color: "lightgreen"} : {color: "red"}}
/>

        </>
    )
}