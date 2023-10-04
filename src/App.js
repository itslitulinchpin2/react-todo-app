import React, {Component} from "react";
import "./App.css"
export default class App extends Component {

  btnStyle={
    color:"#fff",
    border:"none",
    padding:"5px 9px",
    borderRadius:"50%",
    cursor:"pointer",
    float:"right"
  }

  getStyle = () => {
    return{
      padding:"10px",
      borderBottomL :"1px #ccc dotted",
      textDecoration: "none"
    }
  }

  todoData = [
    {
      id: "1",
      title:"공부하기",
      completed:true
    },
    {
      id: "2",
      title:"청소하기",
      completed:false
    }
  ]

  handleClick=(id)=>{
    let newTodoData = this.todoData.filter(data => data.id !== id)
    //클릭한 아이디가 아닌 아이디들만 할 일 목록에 남는다.
    console.log('newTodoData', newTodoData);
  }

  render(){
    return(
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
            </div>


            {this.todoData.map(data => (
              <div style={this.getStyle()} key={data.id}>
                <input type="checkbox" defaultChecked={data.completed}/>
                  {data.title}
                <button style={this.btnStyle} onClick = {()=>this.handleClick(data.id)}>x</button>
              </div>
            ))
            }
          
        </div>
      </div>
    )
  }
}
//클래스 컴포넌트에서는 render() 안에서 UI관련된 코드를 작성한다.
//jsx에서는 css를 위한 명칭으로 class대신 className을 사용한다.