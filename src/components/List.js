import React, { useState } from 'react'

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


  return (
    <div>
        {todoData.map(data => (
              <div key={data.id}>
                <div className="flex item-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded">
                  <div className="items-center">
                    <input type="checkbox" defaultChecked={false}
                    onChange={()=>handleCompleteChange(data.id)}/>
                    <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                    </div>
                    <div className="items-center">
                      <button className='="px-4 py-2 float-right' onClick = {()=>handleClick(data.id)}>x</button>
                    </div>
                </div>
              </div>
            ))
            }

      
    </div>
  )
}
