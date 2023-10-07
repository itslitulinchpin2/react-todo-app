import React, {useCallback, useState} from "react";
import "./App.css"
import Lists from "./components/Lists";
import Form from "./components/Form";
export default function App() {
//toDo의 아이디어 핵심은 value 관리라고 생각한다.
//getStyle함수, 동적으로 CSS바꾸는 코드 확인하기.
//무명함수 사용법, ()=> 여부 확인하기

console.log('App is rendering')
const initialTodoData=localStorage.getItem("todoData") ? JSON.parse(localStorage.getItem("todoData")) : []
const [todoData, setTodoData] = useState(initialTodoData);
const [value,setValue] = useState("");

const handleClick=useCallback((id)=>{
  let newTodoData = todoData.filter(data => data.id !== id)
  //클릭한 아이디가 아닌 아이디들만 할 일 목록에 남는다.
  console.log('newTodoData', newTodoData);
  
  setTodoData(newTodoData);
  localStorage.setItem('todoData', JSON.stringify(newTodoData));
}, [todoData])
  
  const handleRemoveClick = ()=>{
    setTodoData([]);
    localStorage.setItem('todoData', JSON.stringify([]));
  }
      const handleSubmit=(e)=>{
        e.preventDefault(); //form을 전송해도 page 리로드 되지 않음.
        
        //새로운 할 일 데이터 생성
        let newToDo = {
          id:Date.now(), //unique한 값을 위함.
          title:value,
          completed:false
        };
        
        //원래 할 일에 새로운 할 일 추가
        setTodoData((prev)=>[...prev,newToDo]) //이전값을 가져오는 방법.
        localStorage.setItem('todoData', JSON.stringify([...todoData,newToDo]));
        setValue("")
    
      }
    return(
      <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3" >
            <h1>할 일 목록</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>

            <Lists todoData={todoData} setTodoData={setTodoData} handleClick={handleClick}></Lists>
            <Form todoData={todoData} setTodoData={setTodoData} value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
          
        </div>
      </div>
    )
  
}
//클래스 컴포넌트에서는 render() 안에서 UI관련된 코드를 작성한다.
//jsx에서는 css를 위한 명칭으로 class대신 className을 사용한다.