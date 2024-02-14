import React, { createContext, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist'
import RawTool from '@editorjs/raw';
import CustomFontSizeBlock from './CustomBlock';
import './css.css';
import datas  from './data.json';
export const EditorContext=createContext()
let blockid=null;
let blockElement=null;
let data=null;
const object = {
  id: 'ssM8VvO73E',
  type: 'paragraph',
  data: {
    fontSize: '',
    text: 'zeffzf'
  }
};
const list=datas
const blockList = [
  {
    id: 'YBvwIbQmfV',
    type: 'paragraph',
    data: {
      styles: 'font-family: Times New Roman; background-color: red; color: white; display: flex; justify-content: flex-end; border: 2px solid black;',
      text: 'fzefzf'
    }
  },
  {
    id: 'YBvwIdsmfV',
    type: 'paragraph',
    data: {
      styles: 'font-family: Times New Roman; background-color: green; color: white; display: flex; justify-content: flex-end; border: 2px solid black;',
      text: 'fzefzf'
    }
  },
  {
    id: 'YBvwIbQfyV',
    type: 'paragraph',
    data: {
      styles: 'font-family: Times New Roman; background-color: yellow; color: white; display: flex; justify-content: flex-end; border: 2px solid black;',
      text: 'fzefzf'
    }
  }
];
 function Editor(props) {
    const editorInstanceRef= useRef(null)
    const initEditor= ()=>{
        const editor =  new EditorJS({
          blocks: {
            fontSize: {
              class: CustomFontSizeBlock ,
              inlineToolbar: false,
            },
          },
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
              raw: {
                class: RawTool,
                inlineToolbar: false,
              },
              checklist: {
                class: Checklist,
                inlineToolbar: false,
              },
              fontSize: {
                class: CustomFontSizeBlock,
                inlineToolbar: false,
              },
            },
              onChange: async () => {
                data = await editor.save();
                const currentBlockIndex = editorInstanceRef.current.blocks.getCurrentBlockIndex();
                const currentBlock = editorInstanceRef.current.blocks.getBlockByIndex(currentBlockIndex);
                const currentBlockElement = currentBlock.renderedInContentEditable;
                console.log('Current Block Element:', currentBlock);
                // Access the HTML element
                if (currentBlockElement) {
                  console.log('Current Block Element:', currentBlockElement);
                  // Perform additional actions with the HTML element
                }
               // console.log('Block IDs:', blockIds);
               // console.log('B :', data);
              },
        })
        editorInstanceRef.current = editor    
        const editorContainer = document.getElementById('editorjs');
        editorContainer.addEventListener('click', handleBlockClick);
    }


    const handleBlockClick = async (event) => {
      const closestBlock = event.target.closest('.ce-block');
      if (closestBlock) {
        blockElement = closestBlock;
        blockid = blockElement.getAttribute('data-id');
      } else {
        blockElement = null;
        blockid = null;
      }
    };

    const handleGetData2 = async () => {
      try {
        const data = await editorInstanceRef.current.save();
        console.log('Editor data:', data);
        // Now you have access to the data of the editor content
      } catch (error) {
        console.error('Error getting editor data:', error);
      }
    };

    const handleGetData = () => {
      
      
      if(blockElement){
        const blockIndex = Array.from(blockElement.parentNode.children).indexOf(blockElement);
        const block = data.blocks[blockIndex];
        console.log(block)
      }else{
        console.log("no")
      }
     
    };


    const newBlock = async () => {
      const blockManager = editorInstanceRef.current.blocks;
    
      for (const blockData of list) {
        const newBlock = blockManager.insert(blockData.type, blockData.data);
    
        await new Promise(resolve => setTimeout(resolve, 0)); // Delay after inserting the block
    
        const blockElement = document.querySelector(`[data-id="${newBlock.id}"]`);
    
        if (blockElement) {
          console.log(blockElement);
          console.log(newBlock)
          blockElement.setAttribute('id',newBlock.id)
          blockElement.setAttribute('style', blockData.data.styles);
        }
      }
    };


    
    const handleFontSizeChange =async (fontSize) => {
      
      data = await editorInstanceRef.current.save();
      if (blockElement) {
         //change font size
        blockElement.style.fontSize=parseFloat(fontSize)+ 'px';
        blockElement.style

// ------- trai9a 1 ------- //
        // blockElement.style.backgroundColor='red'
        // blockElement.style.color='white'
        // blockElement.style.display='flex'
        // blockElement.style.justifyContent = 'right';
        // blockElement.style.border = '2px solid black';
        //blockElement.style.fontFamily='Times New Roman'
// ------- trai9a 1 ------- //

        // tnajem b zouz toro9 ama hedhi 5ir amamoch ashel hh limbaed

// ------- trai9a 2 ------- //
       const stylesText = "font-family: Times New Roman; background-color: red; color: white; display: flex; justify-content: flex-end; border: 2px solid black;";
        blockElement.setAttribute('style', stylesText);
        console.log(blockElement.style)
// ------- trai9a 2 ------- //
       //change font size

       //save data
        const blockIndex = Array.from(blockElement.parentNode.children).indexOf(blockElement);
        const block = data.blocks[blockIndex];
      //save data
      if(block){
        block.data.styles=stylesText
      }
      } else {
        console.log('Block not found');
      }
    };
  
    const handleFontStyleChange = ( fontStyle) => {
      console.log("yes")
      if (blockElement) {
        // Save data
        const blockIndex = Array.from(blockElement.parentNode.children).indexOf(blockElement);
        const block = data.blocks[blockIndex];


        const spanElement = document.createElement('span');
        
        const text = block.data.text;
        const styledText = `<span style="font-style: ${fontStyle}">${text}</span>`;
        block.data.text = styledText;
        // Apply font style to the span element
       // spanElement.style.fontStyle = fontStyle;
        spanElement.setAttribute('style', `font-style: ${fontStyle}`);
        // Or you can use spanElement.setAttribute('style', `font-style: ${fontStyle}`);
    
        if (block) {
          
          console.log(block)
        }
      } else {
        console.log('Block not found');
      }
    };
  

  const editorRef = useRef(null);


  return (
    <>
    <div>
        <label>Font Size:</label>
        <select onChange={(e) => handleFontSizeChange(e.target.value)}>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="30">30</option>
        </select>
      </div>
      <div>
        <label>Font Style:</label>
        <select onChange={(e) => handleFontStyleChange( e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="sans-serif">sans-serif</option>
          <option value="bold">Bold</option>
        </select>
      </div>
      <button onClick={handleGetData}>Get Editor Data</button>
      <button onClick={newBlock}>Add</button>
    <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
        {props.children}
        
    </EditorContext.Provider>
    
    </>

  )
}
export default Editor;