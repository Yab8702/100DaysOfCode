import { useState } from "react";
import "./TodoList.css";
import { v4 as idv4 } from "uuid";
const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: idv4(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const startEditingTodo = (id) => {
    setEditingTodo(id);
  };

  const saveEditedTodo = (id, newText) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
    setEditingTodo(null);
  };

  const toggleCompleted = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="todo-list">
      <h1>Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={todo.completed ? "completed" : ""}
            onDoubleClick={() => startEditingTodo(todo.id)}
          >
            {editingTodo === todo.id ? (
              <input
                type="text"
                value={todo.text}
                onBlur={() => saveEditedTodo(todo.id, todo.text)}
                onChange={(e) =>
                  setTodos((prevTodos) =>
                    prevTodos.map((item) =>
                      item.id === todo.id
                        ? { ...item, text: e.target.value }
                        : item
                    )
                  )
                }
              />
            ) : (
              <span onClick={() => toggleCompleted(todo.id)}>{todo.text}</span>
            )}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
