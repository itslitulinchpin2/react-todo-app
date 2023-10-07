import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

export default function List({todoData,setTodoData}) {

    // const btnStyle={
    //     color:"#fff",
    //     border:"none",
    //     padding:"5px 9px",
    //     borderRadius:"50%",
    //     cursor:"pointer",
    //     float:"right"
    //   }

      const handleCompleteChange = (id) => {
        let newTodoData = todoData.map(data=>{
          if(data.id===id){
            data.completed=!data.completed
          }
          return data;
        })
        
        setTodoData(newTodoData);
        }

        // const getStyle = (completed) => {
        //     return{
        //       padding:"10px",
        //       borderBottomL :"1px #ccc dotted",
        //       textDecoration: completed ? "line-through" : "none"
        //     }
        //   }
        
          const handleClick=(id)=>{
            let newTodoData = todoData.filter(data => data.id !== id)
            //클릭한 아이디가 아닌 아이디들만 할 일 목록에 남는다.
            console.log('newTodoData', newTodoData);
            
            setTodoData(newTodoData);
          }

      const handleEnd = (result) => {
        if(!result.destination) return;

        const newTodoData = todoData;

        //1. 변경시키는 아이템을 배열에서 지운다.
        //2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderedItem] = newTodoData.splice(result.source.index,1)
        //console.log('reorderedItem', reorderedItem);

        //3. 원하는 ㅜ이치에 reorderedItem을 삽입
        newTodoData.splice(result.destination.index,0,reorderedItem);
        setTodoData(newTodoData)
      }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided)=>(
            <div {...provided.droppableProps} ref={provided.innerRef}>
        {todoData.map((data,index) => (
          <Draggable
            key={data.id}
            draggableId={data.id.toString()}
            index={index}
            >
              {(provided,snapshot)=>(
              <div key={data.id} 
                  {...provided.draggableProps} 
                  ref={provided.innerRef} 
                  {...provided.dragHandleProps}
                  className={`${
                    snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                  } flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}>
                
                  <div className="items-center">
                    <input type="checkbox" defaultChecked={false}
                    onChange={()=>handleCompleteChange(data.id)}/>
                    <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                    </div>
                    <div className="items-center">
                      <button className='="px-4 py-2 float-right' onClick = {()=>handleClick(data.id)}>x</button>
                    </div>
              </div>
        )}
            </Draggable>
            ))}
            {provided.placeholder} 
            </div>
          )}
        </Droppable>
      </DragDropContext>  
    </div>
  )
}
