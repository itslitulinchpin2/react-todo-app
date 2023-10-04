import React, {Component} from "react";
import "./App.css"
export default class App extends Component {


  state = {
    todoData : [
      // {
      //   id: "1",
      //   title:"공부하기",
      //   completed:false
      // },
      // {
      //   id: "2",
      //   title:"청소하기",
      //   completed:false
      // }
    ],
    value:""

  }

  btnStyle={
    color:"#fff",
    border:"none",
    padding:"5px 9px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
  }

  getStyle = (completed) => {
    return{
      padding:"10px",
      borderBottomL :"1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none"
    }
  }

  handleClick=(id)=>{
    let newTodoData = this.state.todoData.filter(data => data.id !== id)
    //클릭한 아이디가 아닌 아이디들만 할 일 목록에 남는다.
    console.log('newTodoData', newTodoData);
    this.setState({todoData:newTodoData})
  }

  handleChange=(event)=>{
    
    this.setState({value:event.target.value})
  }

  handleSubmit=(e)=>{
    e.preventDefault(); //form을 전송해도 page 리로드 되지 않음.
    
    //새로운 할 일 데이터 생성
    let newToDo = {
      id:Date.now(), //unique한 값을 위함.
      title:this.state.value,
      completed:false
    };
    
    //원래 할 일에 새로운 할 일 추가
    this.setState({todoData:[...this.state.todoData, newToDo], value:""})

  }
  
  handleCompleteChange = (id) => {
    let newTodoData = this.state.todoData.map(data=>{
      if(data.id===id){
        data.completed=!data.completed
      }
      return data;
    })
    this.setState({todoData:newTodoData});
    }
  

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

            {this.state.todoData.map(data => (
              <div style={this.getStyle(data.completed)} key={data.id}>
                <input type="checkbox" defaultChecked={false}
                onChange={()=>this.handleCompleteChange(data.id)}/>
                  {data.title}
                <button style={this.btnStyle} onClick = {()=>this.handleClick(data.id)}>x</button>
              </div>
            ))
            }

            <form style={{display:'flex'}} onSubmit={this.handleSubmit}>
              <input 
                type="text" 
                name="value" 
                style={{flex: '10', padding: '5px'}}
                placeholder="할 일을 입력하세요."
                value={this.state.value}
                onChange={this.handleChange}
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
}
//클래스 컴포넌트에서는 render() 안에서 UI관련된 코드를 작성한다.
//jsx에서는 css를 위한 명칭으로 class대신 className을 사용한다.