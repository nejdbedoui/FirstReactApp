import {useEffect, useState} from "react";

export default function CounterF(props) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        console.log("Use effect")
        return () => {
            console.log("I'm Unmounting")
        }
    }, [])
    useEffect(() => {
        console.log("Use effect []")
    })
    useEffect(() => {
        console.log("Use effect [count]")
    }, [count])
    return (
        <>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
            <p>
                {count} - {props.name}
            </p>
        </>
    )
}