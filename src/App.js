import React, {useState} from "react";
import "./App.css"
export default function App() {
//toDo의 아이디어 핵심은 value 관리라고 생각한다.
//getStyle함수, 동적으로 CSS바꾸는 코드 확인하기.
//무명함수 사용법, ()=> 여부 확인하기
  
const [todoData, setTodoData] = useState([]);
const [value,setValue] = useState("");



  const btnStyle={
    color:"#fff",
    border:"none",
    padding:"5px 9px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
  }

  const getStyle = (completed) => {
    return{
      padding:"10px",
      borderBottomL :"1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  const handleClick=(id)=>{
    let newTodoData = todoData.filter(data => data.id !== id)
    //클릭한 아이디가 아닌 아이디들만 할 일 목록에 남는다.
    console.log('newTodoData', newTodoData);
    
    setTodoData(newTodoData);
  }

  const handleChange=(event)=>{
    
    setValue(event.target.value);
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
    setValue("")

  }
  
  const handleCompleteChange = (id) => {
    let newTodoData = todoData.map(data=>{
      if(data.id===id){
        data.completed=!data.completed
      }
      return data;
    })
    
    setTodoData(newTodoData);
    }
  

  
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

            {todoData.map(data => (
              <div style={getStyle(data.completed)} key={data.id}>
                <input type="checkbox" defaultChecked={false}
                onChange={()=>handleCompleteChange(data.id)}/>
                  {data.title}
                <button style={btnStyle} onClick = {()=>handleClick(data.id)}>x</button>
              </div>
            ))
            }

            <form style={{display:'flex'}} onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="value" 
                style={{flex: '10', padding: '5px'}}
                placeholder="할 일을 입력하세요."
                value={value}
                onChange={handleChange}
              />
              <input 
                type="submit"
                value="입력"
                className="btn"
                style={{flex:'1'}}
                />
            </form>
          
        </div>
      </div>
    )
  
}
//클래스 컴포넌트에서는 render() 안에서 UI관련된 코드를 작성한다.
//jsx에서는 css를 위한 명칭으로 class대신 className을 사용한다.