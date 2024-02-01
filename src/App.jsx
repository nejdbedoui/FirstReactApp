import { useState,useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'

function App() {
  const [count, setCount] = useState(0)
  const hello = (t)=>{
    return t+2
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8081/api/controllers/getTrajet')
      .then(response => response.json())
      .then(data => {
        setData(data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <>
      <div>
        <Header></Header>
        {data ? (
        <ul>
          {data.map(item => (
            <li key={item.id}>{item.pointDepart}</li>
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
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
