import React, { useState } from 'react'
import { DragDropContext, Droppable,Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';



const itemsB=[
    {id:uuidv4(),name:'Header'},
    {id:uuidv4(),name:'Paragraphe'},
    {id:uuidv4(),name:'Image'},
    {id:uuidv4(),name:'Table'},
];

const defaultcolumn=
    {
        [uuidv4()]:{
            name:'Default',
            items:itemsB
        },
        [uuidv4()]:{
            name:'Page1',
            items:[]
        },
        [uuidv4()]:{
            name:'Page2',
            items:[]
        },
        [uuidv4()]:{
            name:'Page3',
            items:[]
        }
    };
    
    

export default function DragAndDrop() {
const [columns,setColumns] = useState(defaultcolumn);
const onDragEnd= (result, columns, setColumns)=>{
    if(!result.destination) return;
    const {source, destination} = result;
    if(source.droppableId !== destination.droppableId){
        const sourceColumn = columns[source.droppableId];
        const desColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems =  [...desColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index,0,removed);
        setColumns({
            ...columns,
            [source.droppableId]:{
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]:{
                ...desColumn,
                items:destItems
            }
        })
    }else{
        const column =columns[source.droppableId];
        const copiedItems= [...column.items];
        const [removed]=copiedItems.splice(source.index,1);
        copiedItems.splice(destination.index,0,removed);
        setColumns({
            ...columns,
            [source.droppableId]:{
                ...column,
                items: copiedItems
            }
        });
    }
    
};
  return (
    <>
        <div>DragAndDrop START</div>
        <div style={{display: 'flex', justifyContent: 'center', height: '100%'}}>
            <DragDropContext  onDragEnd={result=> onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id,column])=>{
                    return (
                        <div style={{ display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                        <Droppable key={id} droppableId={id}>
                            {(provided,snapshot)=>{
                                return(
                                    <div 
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    style={{
                                        background:snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
                                        padding:4,
                                        width:250,
                                        minHeight:500
                                    }}
                                    >
                                        {column.items.map((item,index)=>{
                                            return(
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided, snapshot)=>{
                                                        
                                                        return (
                                                            <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={{
                                                                userSelect: 'none',
                                                                padding: 16,
                                                                margin:'0 0 8px 0',
                                                                minHeight:'50px',
                                                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
                                                                color: 'white',
                                                                ...provided.draggableProps.style
                                                            }}
                                                            >
                                                                {item.name}
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {provided.placeholder}
                                    </div>
                                )}
                            }
                        </Droppable>
                        </div>
                        </div>
                    )
                })}
            </DragDropContext>
        </div>
        <div>DragAndDrop END</div>
    </>
  )
}
