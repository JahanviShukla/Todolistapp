import React, { Component } from 'react'

export default class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input:""
      };
  }

  // handle input fields changes 

  handleInputChange=(event)=>{
    this.setState({input:event.target.value});
  };

  //  Add new task
  addTask=()=>{
    if(this.state.input.trim()){
      this.setState((prevState)=>({
        tasks:[...prevState.tasks,prevState.input],
        input:""
      }));
    }
  };

  // delete a task
  deleteTask=(index)=>{
    this.setState((prevState)=>({
      tasks:prevState.tasks.filter((task, i)=>i !== index)
      }));
      };

  render() 
  {
    return (
      
      <div style={{padding:"20px",textAlign:"center"}}>
        <div style={{backgroundColor:"black" , padding:"10px", width:"50%",marginLeft:"350px", border:"4px solid grey"}}>
        <h1 className='font-bold text-white text-2xl '>To-Do List</h1>
        </div>
      
      <br></br>
      <input
        type="text"
        value={this.state.input}
        onChange={this.handleInputChange}
        placeholder="Add a new task"
        style={{ padding: '8px', width: '20%',border:"2px solid black"}}
      />
      <button onClick={this.addTask} style={{marginLeft:"20px", border:"2px solid black", padding:"8px", width:"100px", backgroundColor:"GrayText"}}>
        Add
      </button>
      <ul style={{ marginTop: '20px' , padding:"2px"}}>
        {this.state.tasks.map((task, index) => (
          <li key={index} style={{ margin: '10px 0'}}>
            {task}
            <button
              onClick={() => this.deleteTask(index)}
              style={{ marginLeft: '70px', color: 'red' , border:"2px solid black", padding:"4px"}}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
      
    );
  }
}


