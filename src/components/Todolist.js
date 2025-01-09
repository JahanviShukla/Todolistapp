
import React, { Component } from 'react';

export default class Todolist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      input: "",
      error: null,
      selectedTaskId: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/tasks')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => this.setState({ tasks: data }))
      .catch((error) => this.setState({ error }));
  }

  handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  addTask = () => {
    if (this.state.input.trim()) {
      const newTask = { title: this.state.input };

      fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((task) => {
          this.setState((prevState) => ({
            tasks: [...prevState.tasks, task],
            input: '',
          }));
        })
        .catch((error) => this.setState({ error }));
    }
  };

  deleteTask = (id) => {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        this.setState((prevState) => ({
          tasks: prevState.tasks.filter((task) => task.id !== id),
        }));
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    // Define reusable styles
    const styles = {
      container: {
        padding: "20px",
        textAlign: "center",
      },
      header: {
        backgroundColor: "black",
        padding: "10px",
        width: "30%",
        margin: "0 auto",
        border: "4px solid grey",
        borderRadius: "10px",
      },
      title: {
        color: "white",
        fontWeight: "bold",
        fontSize: "24px",
      },
      input: {
        padding: "8px",
        width: "20%",
        border: "2px solid black",
        borderRadius: "8px",
      },
      dropdown: {
        padding: "8px",
        width: "22%",
        marginLeft: "10px",
        border: "2px solid black",
        borderRadius: "8px",
      },
      addButton: {
        marginLeft: "20px",
        border: "2px solid black",
        padding: "8px",
        width: "100px",
        borderRadius: "8px",
        backgroundColor: "#007BFF",
        color: "white",
        cursor: "pointer",
      },
      errorText: {
        color: "red",
        marginTop: "10px",
      },
      taskList: {
        marginTop: "20px",
        padding: "10px",
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
      },
      taskItem: {
        border: "2px solid black",
        padding: "10px",
        width: "40%",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
        display:"flex",
        justifyContent:"space-between",
        alignItems:"center",
        marginLeft:"6px"
      },
      taskText: {
        fontSize: "18px",
        fontWeight: "500",
      },
      deleteButton: {
        marginTop: "10px",
        padding: "8px 12px",
        border: "1px solid #ccc",
        color: "white",
        backgroundColor: "red",
        cursor: "pointer",
        borderRadius: "4px",
        fontWeight: "bold",
        alignItems:"center"
      },
    };

    // / Filter tasks based on selectedTaskId
  const displayedTasks = this.state.selectedTaskId && this.state.selectedTaskId !== ""
      ? this.state.tasks.filter((task) => task.id === this.state.selectedTaskId)
      : this.state.tasks;
  
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>To-Do List</h1>
        </div>
        <br />
        <input
          type="text"
          value={this.state.input}
          onChange={this.handleInputChange}
          placeholder="Add a new task"
          style={styles.input}
        />



         {/* Dropdown for selecting a task */}
      {this.state.tasks.length > 0 && (
        <select
          style={styles.dropdown}
          value={this.state.selectedTaskId || ""}
          onChange={(e) =>
            this.setState({ selectedTaskId: e.target.value })
          }
        >
          <option value="">
            Show all tasks
          </option>
          {this.state.tasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>
      )}

        <button onClick={this.addTask} style={styles.addButton}>
          Add
        </button>


       
      {/* error message */}
        {this.state.error && <p style={styles.errorText}>{this.state.error.message}</p>}


        {/* /* Display filtered tasks */} 
      <ul style={styles.taskList}>
        {displayedTasks.map((task) => (
          <li key={task.id} style={styles.taskItem}>
            <span>{task.title}</span>
            <div>
              <button
                onClick={() => this.deleteTask(task.id)}
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
}