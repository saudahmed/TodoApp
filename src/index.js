import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

let id = 0;

//creating react component
const Todo = props => (
  <li>
    <span>{props.todo.text}</span>
    <input
      type="checkbox"
      checked={props.todo.checked}
      onChange={props.onToggle}
    />
    <button onClick={props.onDelete}>delete</button>
  </li>
);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  addTodo() {
    const text = prompt("TODO next please!");
    this.setState({
      todos: [...this.state.todos, { id: id++, text: text, checked: false }] //cloning array short cut
    });
  }

  removeTodo(id) {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    });
  }

  toggleTodo(id) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) return todo;
        else {
          todo.checked = !todo.checked
          return todo
          //Otherway to return
          /*return {
            id: todo.id,
              text: todo.text,
                checked: !todo.checked
          };*/
        }
      })
    });
  }

  render() {
    return (
      <div>
        <div>Totol todos: {this.state.todos.length}</div>
        <div>Unchecked todos: {this.state.todos.filter(todo => todo.checked === false).length}</div>
        <button onClick={this.addTodo.bind(this)}>Add TODO</button>
        <ul>
          {this.state.todos.map(todo => (
            <Todo
              onDelete={() => this.removeTodo(todo.id)}
              onToggle={() => this.toggleTodo(todo.id)}
              todo={todo}
            />
          ))}
        </ul>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
