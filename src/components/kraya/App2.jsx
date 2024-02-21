import {createContext, useState} from "react";
import "../../App.css";
import MemoExample from "./MemoExample.jsx";
import Header from "./header.jsx";
import CounterC from "./CounterC.jsx";
import CounterF from "./CounterF.jsx";
import Dashboard from "./Dashboard.jsx";
export const ThemeContext=createContext(null);
function App2() {
    let persons = [
       
        {
            name: "Yosra",
            age: 22,
        },
    ];
    const style1 = {
        color: "red",
        backgroundColor: "black",
        fontSize: "2rem",
    };
    const styleCounterF = {
        backgroundColor: "red"
    }
    const handleClick = () => {
        alert("this is an alert");
    };
    const name = "Ka7la"
    const [show, setShow] = useState(true)
    let test = true;

    const [theme, setTheme] = useState(true)
    return (
        <>
        <ThemeContext.Provider value={{theme, setTheme}} >
        <Dashboard theme={theme} setTheme={setTheme}/>
        </ThemeContext.Provider>





















<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>





            {/* <Header name="Header"/>
            <Header name="bilel"/>
            <Header name="Bayoudh"/>
            <Header name="Mehdi"/>
            <MemoExample/>
            <CounterC propsName={test}/>
            <button onClick={() => setShow(!show)}>Show</button>
            <div style={styleCounterF}>
                CounterF:
                {show && <CounterF name={name}/>}
            </div>

            <h1 style={style1}>Persons List</h1>
            <ul>
                <>
                    {persons.map((person, index) => {
                        return (
                            <li key={index}>
                                {person.name}-{person.age}-{index}
                            </li>
                        );
                    })}
                </>
            </ul>
            <button onClick={handleClick}>Alert</button>
            {!test ? <p>True</p> : <p>False</p>}
            {test && <p>Trueeeeeeee</p>}
            {/* balise kima l img lezem t7ot : */}
            {/* <img src="" alt=""/> */} 
        </>
    );
}

export default App2;