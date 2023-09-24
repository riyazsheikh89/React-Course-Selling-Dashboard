import { useState } from "react";

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState("");

    const addTodo = () => {
      setTodos([...todos, todo]);
      setTodo("");
    };

    const removeTodo = (e) => {
      const updatedTodo = [...todos];
      updatedTodo.splice(e.index, 1);
      setTodos(updatedTodo);
    };

    function enterKeyHandler(e) {
      if (e.keyCode === 13) {
        // 13 : keyCode for Enter key
        addTodo();
      }
    }

    return (
      <div>
        <h1>Best Todo List ever</h1>

        <div>
          <input
            type="text"
            placeholder="Entere your todo here"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            onKeyDown={enterKeyHandler}
          />
          <button type="submit" onClick={addTodo}>
            Add to Todo{" "}
          </button>
        </div>

        <div>
          <ul>
            {todos.map((todo, index) => (
              <li key={index}>
                {todo}
                <button onClick={removeTodo}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
};

export default Todo;
