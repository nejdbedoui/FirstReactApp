import React, { createContext, useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import Checklist from '@editorjs/checklist'
import RawTool from '@editorjs/raw';
import CustomFontSizeBlock from './CustomBlock';
import './css.css';
import datas  from './data.json';
import ColorPlugin from 'editorjs-text-color-plugin'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './toolBarcss.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold,faItalic,faAlignLeft,faAlignCenter,faAlignRight,faAlignJustify,faUnderline } from '@fortawesome/free-solid-svg-icons';
import SketchExample from './SketchExample';

export const EditorContext=createContext()
let blockid=null;
let blockElement=null;
let data=null;
const list=datas
let selectedText = null;
let startPosition = null;
let endPosition = null;

 function Editor(props)  {
  
    const editorInstanceRef= useRef(null)
    const initEditor= ()=>{
        const editor =  new EditorJS({
            holder:"editorjs",
            placeholder:"Let's take a note!",
            tools: {
              Color: {
                class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                config: {
                   colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                   defaultColor: '#FF1300',
                   type: 'text', 
                   customPicker: true // add a button to allow selecting any colour  
                }     
              },
              Marker: {
                class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
                config: {
                   defaultColor: '#FFBF00',
                   colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                   type: 'marker',
                   icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
                   customPicker: true
                  }       
              },
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
              }
            },
              onChange: async () => {
                data = await editor.save();
                const currentBlockIndex = editorInstanceRef.current.blocks.getCurrentBlockIndex();
                const currentBlock = editorInstanceRef.current.blocks.getBlockByIndex(currentBlockIndex);
                const currentBlockElement = currentBlock.renderedInContentEditable;
               // console.log('Current Block Element:', currentBlock);
                // Access the HTML element
                if (currentBlockElement) {
                //  console.log('Current Block Element:', currentBlockElement);
                  // Perform additional actions with the HTML element
                }
               // console.log('Block IDs:', blockIds);
               // console.log('B :', data);
              },
        })
        editorInstanceRef.current = editor    
        const editorContainer = document.getElementById('editorjs');
        editorContainer.addEventListener('click', handleBlockClick);
        //editorContainer.addEventListener('mouseup', handleTextSelection);
        editorContainer.addEventListener('mouseup', handel2);
    }


    // const handleTextSelection = async (event) => {
    //   const closestBlock = event.target.closest('.ce-block');
    //   let blockElement, blockId;
    
    //   if (closestBlock) {
    //     blockElement = closestBlock;
    //     blockId = blockElement.getAttribute('data-id');
    //   } else {
    //     blockElement = null;
    //     blockId = null;
    //   }
    
    //   const selectedText = window.getSelection().toString();
    //   if (selectedText && blockElement && blockId) {
    //     const color = 'rgb(255, 19, 0)';
    //     const backgroundColor = 'rgb(255, 191, 0)';
    
    //     const editor = editorInstanceRef.current;
    //     const blockIndex = Array.from(blockElement.parentNode.children).indexOf(blockElement);
    //     const block =  editor.blocks.getBlockByIndex(blockIndex);
    //     console.log(editor.blocks.getBlockByIndex(blockIndex))
    //     const blockText = editor.blocks[blockIndex].data.text || '';
    
    //     const startIndex = blockText.indexOf(selectedText);
    //     const endIndex = startIndex + selectedText.length;
    
    //     if (startIndex > -1) {
    //       const wrappedText = `${blockText.substring(0, startIndex)}<font style="color: ${color};">${selectedText}</font>${blockText.substring(endIndex)}`;
    
    //       block.data.text=wrappedText
    //       await editorInstanceRef.current.save();
    //       // Callback after block update is complete
    //       console.log('Text wrapped successfully');
    //     }
    //   }
    // };


    const handel3  = async (event) => {
      const closestBlock = event.target.closest('.ce-block');
      let blockElement, blockId;
      if (closestBlock) {
        blockElement = closestBlock;
        blockId = blockElement.getAttribute('data-id');
      } else {
        blockElement = null;
        blockId = null;
      }
      const selection = window.getSelection();
       selectedText = selection.toString();
      // console.log(selectedText)
       if(startPosition > endPosition){
        startPosition = selection.focusOffset;
        endPosition = selection.anchorOffset;
       }else{
        startPosition = selection.anchorOffset;
       endPosition = selection.focusOffset;
       }
      // console.log('Start Position :', endPosition);
      // console.log('End Position:', startPosition);
    };

    const handel2 = async (event) => {
      const closestBlock = event.target.closest('.ce-block');
      let blockElement, blockId;
      if (closestBlock) {
        blockElement = closestBlock;
        blockId = blockElement.getAttribute('data-id');
      } else {
        blockElement = null;
        blockId = null;
      }
      const selection = window.getSelection();
      selectedText = selection.toString();
      const range = selection.getRangeAt(0);
      const preSelectionRange = range.cloneRange();
      preSelectionRange.selectNodeContents(blockElement);
      preSelectionRange.setEnd(range.startContainer, range.startOffset);
       startPosition = preSelectionRange.toString().length;
    
      // Adjust endPosition by excluding the length of the selectedText itself
       endPosition = startPosition + selectedText.length;
    
     
    };





////// add bold italic underline or color to selected text ////////

const cleanHTMLTags = (text) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/html');
  const emptyTags = doc.querySelectorAll(':empty');
  emptyTags.forEach((tag) => tag.parentNode.removeChild(tag));
  const cleanedText = doc.body.innerHTML;
  return cleanedText;
};


const handleDataFromChild = (data) => {
  const startTime = performance.now();
  const word="font"
  const open=`<font style="color: ${data};">`
  const close='</font>'
  
  changeColor(word,open,close);
  const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
};

   

    const selectcolor2=(event)=>{
      // const word="font"
      // const open=`<font style="color: ${event};">`
      // const close='</font>'
      const word="b"
      const open=`<b>`
      const close='</b>'
      changeColor(word,open,close);
    }
    const addstyle = (word) => {
      const startTime = performance.now();
      const open = `<${word}>`;
      const close = `</${word}>`;
      changeColor(word, open, close);
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
  }
   const changeColor=  async (word,open,close)=>{
      let left=''
      let midle=''
      let right=''
      let leftResult
      let midleResult
      let rightResult

        let a=startPosition
        let b=endPosition
        if(a > b){
          a=startPosition
          b=startPosition
         }
        if (blockid) {
          const updatedData = data;
          const currentBlock = updatedData.blocks.find((block) => block.id === blockid);
          
          if (currentBlock) {
            let currentText = currentBlock.data.text;
            
            const textArray = currentText.split('');
            let skipMode = false;
        
            for (let i = 0; i < textArray.length && i < b; i++) {
                if (i === b) {
                    break;
                }
                
                if (textArray[i] === '<') {
                    skipMode = true;
                }
                
                if (skipMode && i <= a) {
                    a++;
                    b++;
                }
                
                if (skipMode && i > a) {
                    b++;
                }
                
                if (textArray[i] === '>') {
                    skipMode = false;
                }
            }
            left=currentText.substring(0, a)
            midle=currentText.substring(a, b)
            right=currentText.substring(b)
            leftResult=checkLeft( left,word)
            midleResult=countAndSubtractTags(midle,word)
            rightResult=checkright(right,word)
            if(leftResult.check && rightResult.check && word!="font"){

              const modifiedText = [
                leftResult.text,
                midleResult.text,
                rightResult.text
            ].join('');
            currentBlock.data.text = cleanHTMLTags(modifiedText);
            }else if(leftResult.check && !rightResult.check && word!="font"){
              console.log("yes");

              const modifiedText = [
                leftResult.text,
                midleResult.text,
                rightResult.storedOpenTags,
                rightResult.text
            ].join('');
            currentBlock.data.text = cleanHTMLTags(modifiedText);
            }else if(!leftResult.check && rightResult.check && word!="font"){
              console.log("yes");

              const modifiedText = [
                leftResult.text,
                rightResult.CloseTag,
                midleResult.text,
                rightResult.text
            ].join('');
            currentBlock.data.text = cleanHTMLTags(modifiedText);
            }else if(!leftResult.check && !rightResult.check && leftResult.CloseTag && rightResult.storedOpenTags && word!="font"){
              console.log("case 4")
              if(word =="font"){
                 midleResult.text=open+midleResult.text+close
               }
              const modifiedText = [
                leftResult.text,
                leftResult.CloseTag,
                midleResult.text,
                rightResult.storedOpenTags,
                rightResult.text
            ].join('');
            currentBlock.data.text = cleanHTMLTags(modifiedText);
            }else{
              console.log("add")
              const modifiedText = [
                currentText.substring(0, a),
                midleResult.storedCloseTags,
                open,
                midleResult.text,
                close,
                midleResult.storedOpenTags,
                currentText.substring(b)
            ].join('');
            currentBlock.data.text = cleanHTMLTags(modifiedText)
            }
            }
            editorInstanceRef.current.render(updatedData);
          console.log('//////////////////////////////////////////////');
      }
    }

    function checkLeft(text, word) {
      let storedOpenTags = '';
      let CloseTag = '';
      let check=false
      if(text!=''){
        let startIndex = text.length - 1; 
        let endIndex = text.length;
      while ((startIndex = text.lastIndexOf('<'+word, startIndex)) !== -1 ) {
          endIndex = text.indexOf(word+'>', startIndex);
          if (endIndex === -1) {
              break;
          }
          const tag = text.substring(startIndex, endIndex + 1);
          if (tag.startsWith('</' + word)) {
              break;
          } else if (tag.startsWith('<' + word)) {
               storedOpenTags = text.substring(startIndex, endIndex + 1);
              if (endIndex + 1 === text.length) {
                  text = text.substring(0, startIndex);
                  check=true
                  break
              }else{
                CloseTag='</' + word+'>'
                break
              }
              
          }
          startIndex--; 
      }
    }
  
      return { storedOpenTags, CloseTag, text,check };
  }

  function checkright(text, word) {
    console.log("yes");

    let storedOpenTags = '';
    let CloseTag = '';
    let startIndex = 0; 
    let endIndex = 0;
    let check=false
    
    while ((startIndex = text.indexOf('<', endIndex)) !== -1 && endIndex!=text.length) {
        endIndex = text.indexOf('>', startIndex);
        if (endIndex === -1) {
            break;
        }
        const tag = text.substring(startIndex, endIndex + 1);
       // console.log(startIndex + " " + endIndex + " " + text.length+"  "+tag.length);
        if (tag.startsWith('</' + word)) {
            if (tag.length === endIndex+1) {
                text = text.substring(endIndex+1 ,text.length);
                CloseTag = tag;
                check=true
            } else {
                CloseTag = tag;
                storedOpenTags='<' + word+'>'    
            }
            break;
        } else if (tag.startsWith('<' + word)) {
            break;
        }
        endIndex++; // Move to the next '>' character
    }
  

    return { storedOpenTags, CloseTag, text,check };
}

  

    function countAndSubtractTags(text,word) {
      let storedOpenTags = '';
      let storedCloseTags = '';
      let closedtag=false;
      let startIndex = 0;
      let endIndex = 0;
      let startopen=false;
      let countWord1 = (text.match(new RegExp('<'+word, 'g')) || []).length;
      let countWord2 = (text.match(new RegExp('</'+word+'>', 'g')) || []).length;
      
      while ((startIndex = text.indexOf('<', endIndex)) !== -1) {
        
          endIndex = text.indexOf('>', startIndex);
          if (endIndex === -1) {
              break; 
          }
  
          const tag = text.substring(startIndex, endIndex + 1);
          if (tag.startsWith('</'+word)) {
            if(!startopen){
              closedtag=true
              storedCloseTags +=text.substring(startIndex, endIndex+1)
            }
            text=text.slice(0, startIndex) + text.slice(endIndex + 1);
            startIndex = 0;
            endIndex = 0;
            countWord2--;
          } 
          else if(tag.startsWith('<'+word)) {
            startopen=true
             if(countWord2>0 ){
              countWord1--;
            }else if(countWord1>0 && countWord2<=0){
              storedOpenTags += text.substring(startIndex, endIndex+1);
              closedtag=false
            }
            text=text.slice(0, startIndex) + text.slice(endIndex + 1);
            startIndex = 0;
            endIndex = 0;
          }
          
          
      }
  
  
      return { storedOpenTags, storedCloseTags, text };
  }
 ////// end of add bold italic underline or color to selected text ////////





////// when block is clicked ////////
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
////// end of when block is clicked ////////








    ////// show clicked block////////
    const handleGetData = () => {
      if(blockElement){
        const blockIndex = Array.from(blockElement.parentNode.children).indexOf(blockElement);
        const block = data.blocks[blockIndex];
        console.log(block)
      }else{
        console.log("no")
      }
     
    };
////// end of show clicked block////////








///////////////////         load from db          ////////////////////////

// willl be changed with useeffect when geting the data 
    const newBlock2 = async () => {
      // my solution
      const startTime = performance.now();
      const blockManager = editorInstanceRef.current.blocks;
    
      for (const blockData of list) {
        const newBlock = blockManager.insert(blockData.type, blockData.data);
    
    
        const blockElement = document.querySelector(`[data-id="${newBlock.id}"]`);
    
        if (blockElement) {
         // console.log(blockElement);
         // console.log(newBlock)
          blockElement.setAttribute('id',newBlock.id)
          blockElement.setAttribute('style', blockData.data.styles);
        }
      }
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
    };

    const newBlock3 = async () => {
      //batch dom updates
      const startTime = performance.now();
      const blockManager = editorInstanceRef.current.blocks;
    
      const blockElements = [];
      for (const blockData of list) {
        const newBlock = blockManager.insert(blockData.type, blockData.data);
        const blockElement = document.querySelector(`[data-id="${newBlock.id}"]`);
        if (blockElement) {
          blockElements.push(blockElement);
        }
      }
      // Apply styles collectively outside the loop
      for (const [index,blockElement] of blockElements.entries()) {
        // Retrieve the style from the block's attribute
        // Apply the style to the block element
        blockElement.setAttribute('style', list[index].data.styles);
      }
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
    };


    const newBlock4 = async () => {
           //ecmascript version 1
      const startTime = performance.now();



      const blockManager = editorInstanceRef.current.blocks;

  const blockElements = list.map((blockData) => {
    const newBlock = blockManager.insert(blockData.type, blockData.data);
    const blockElement = document.querySelector(`[data-id="${newBlock.id}"]`);
    return blockElement;
  }).filter(Boolean);

  blockElements.forEach((blockElement, index) => {
    const style = list[index].data.styles;
    blockElement.setAttribute('style', style);
  });




      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
    };



    const newBlock = async () => {
      //ecmascript version 2
      const startTime = performance.now();
      const blockManager = editorInstanceRef.current.blocks;
      list.map((blockData) => {
        const newBlock = blockManager.insert(blockData.type, blockData.data);
        const blockElement = document.querySelector(`[data-id="${newBlock.id}"]`);
        return blockElement;
      })
        .filter(Boolean)
        .map((blockElement, index) => {
          const style = list[index].data.styles;
          blockElement.setAttribute('style', style);
        });
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log('Elapsed time:', elapsedTime, 'milliseconds');
    };

///////////////////         end of load from db          ////////////////////////

    const handleFontSizeChange =async (fontSize) => {
      
      data = await editorInstanceRef.current.save();
      if (blockElement) {
         //change font size
        blockElement.style.fontSize=parseFloat(fontSize)+ 'px';
        blockElement.style

// ------- trai9a 1 ------- //
         blockElement.style['backgroundColor']='red'
         blockElement.style.color='white'
         blockElement.style.display='flex'
         blockElement.style.justifyContent = 'right';
         blockElement.style.border = '2px solid black';
        blockElement.style.fontFamily='Times New Roman'
// ------- trai9a 1 ------- //

        // tnajem b zouz toro9 ama hedhi 5ir amamoch ashel hh limbaed

// ------- trai9a 2 ------- //
       //const stylesText = "font-family: Times New Roman; background-color: red; color: white; display: flex; justify-content: flex-end; border: 2px solid black;";
        //blockElement.setAttribute('style', stylesText);
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
        <select onChange={(e) => selectcolor2( e.target.value)}>
          <option value="Arial">Arial</option>
          <option value="sans-serif">sans-serif</option>
          <option value="bold">Bold</option>
        </select>
      </div>
      <button onClick={handleGetData}>Get Editor Data</button>
      <button onClick={newBlock}>Add</button> 
      <div className="container">
      <div className="btn-group" role="group" aria-label="Basic example">
      <button onClick={() => addstyle('b')} type="button" className="btn btn-light btn-sm">
      <FontAwesomeIcon icon={faBold} />
      </button>
      <button onClick={() => addstyle('i')} type="button" className="btn btn-light btn-sm">
      <FontAwesomeIcon icon={faItalic} />
      </button>
      <button onClick={() => addstyle('u')} type="button" className="btn btn-light btn-sm">
      <FontAwesomeIcon icon={faUnderline} />
      </button>

        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignLeft} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignCenter} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignRight} />
        </button>
        <button type="button" className="btn btn-light btn-sm">
        <FontAwesomeIcon icon={faAlignJustify} />
        </button>
        <SketchExample onData={handleDataFromChild} />
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
      <select className="form-control form-control-sm">
            <option>8 pt</option>
            <option>10 pt</option>
            <option>12 pt</option>
            <option>14 pt</option>
            <option>18 pt</option>
            <option>24 pt</option>
            <option>36 pt</option>
        </select>
        </div>
    </div>
    
    
    <EditorContext.Provider value={{initEditor, editorInstanceRef}}>
        {props.children}
        
    </EditorContext.Provider>
    
    </>

  )
}
export default Editor;