import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({todoData,setTodoData,handleClick})=> {

    // const btnStyle={
    //     color:"#fff",
    //     border:"none",
    //     padding:"5px 9px",
    //     borderRadius:"50%",
    //     cursor:"pointer",
    //     float:"right"
    //   }


        // const getStyle = (completed) => {
        //     return{
        //       padding:"10px",
        //       borderBottomL :"1px #ccc dotted",
        //       textDecoration: completed ? "line-through" : "none"
        //     }
        //   }
        
        console.log('Lists is rendering')

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
        localStorage.setItem('todoData', JSON.stringify(newTodoData));
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
            <List
            handleClick={handleClick}
            key={data.id}
            id={data.id}
            title={data.title}
            completed={data.completed}
            todoData={todoData}
            setTodoData={setTodoData}
            provided={provided}
            snapshot={snapshot}></List>
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
})

export default Lists