import React, { Fragment, useState, useEffect } from "react";
import EditTodo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const jsonData = await response.json();

      setTodos(jsonData);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE"
      });
      const filteredTodos = todos.filter((todo) => todo.id !== id);
      setTodos(filteredTodos);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <table className='table mt-5 text-center border border-light'>
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td className='text-left'>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodo;
