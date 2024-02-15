import { useState  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import DragAndDrop from './components/DragAndDrop'
import DragAndDrop2 from './components/DragAndDrop2'
import Editorjs from './components/Editorjs/Editorjs'
import ExampleWrapper from './components/ExampleWrapper'
import App2 from './components/kraya/App2'
import ToolBar from './components/Editorjs/toolBar'

function App() {
  const [count, setCount] = useState(0)
  const hello = (t)=>{
    return t+2
  }

  return (
    <>
      <div>
        <ToolBar></ToolBar>
       <Editorjs></Editorjs>
        <Header></Header>
        <DragAndDrop2></DragAndDrop2>
        <DragAndDrop></DragAndDrop>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => hello(count))}>
          count is {count}
        </button>
        
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
