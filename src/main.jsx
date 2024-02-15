import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Editor from './components/Editorjs/Editor.jsx'
import App2 from './components/kraya/App2.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
  {/* <App2 /> */}
<Editor>
<App />
</Editor>



  
  </>
  ,
)
