import React, {useState} from "react";
import "./App.css"
import List from "./components/List";
import Form from "./components/Form";
export default function App() {
//toDo의 아이디어 핵심은 value 관리라고 생각한다.
//getStyle함수, 동적으로 CSS바꾸는 코드 확인하기.
//무명함수 사용법, ()=> 여부 확인하기
  
const [todoData, setTodoData] = useState([]);
const [value,setValue] = useState("");
  
  
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
        setValue("")
    
      }
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

            <List todoData={todoData} setTodoData={setTodoData}></List>
            <Form todoData={todoData} setTodoData={setTodoData} value={value} setValue={setValue} handleSubmit={handleSubmit}></Form>
          
        </div>
      </div>
    )
  
}
//클래스 컴포넌트에서는 render() 안에서 UI관련된 코드를 작성한다.
//jsx에서는 css를 위한 명칭으로 class대신 className을 사용한다.