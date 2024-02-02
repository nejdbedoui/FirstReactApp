import React from 'react'
import { useState,useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function FirstApi() 
{ const [count, setCount] = useState(0)
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
      
      </>
    )
  }