import React, { createContext, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist'
export const EditorContext=createContext()

 function Editor(props) {
    const editorInstanceRef= useRef(null)
    const initEditor= ()=>{
        const editor =  new EditorJS({
            holder:"editorjs",
            placeholder:"Let's take a note!",
            tools: {
                header: {
                class: Header,
                config: {
                  placeholder: 'Enter a header',
                  levels: [1,2, 3, 4],
                  defaultLevel: 1,
                  shortcut: 'CMD+SHIFT+H',
                }
              },
              checklist: {
                class: Checklist,
                inlineToolbar: true,
              },},
            onChange: async ()=>{
                const data = await editor.save()
            }
        })
        editorInstanceRef.current = editor    
    }
   

  const editorRef = useRef(null);


  return (
    <>
    <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
        {props.children}
    </EditorContext.Provider>
    
    </>

  )
}
export default Editor;