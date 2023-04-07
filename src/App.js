import "./Components/Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditID] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    if (todo !== "") {
      if (editId) {
        const updatedTodos = todos.map((to) =>
          to.id === editId ? { ...to, list: todo } : to
        );
        setTodos(updatedTodos);
        setEditID(0);
      } else {
        setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      }
      setTodo("");
    }
  };

  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const deleteAll = () => {
    setTodos([])
  }
  const onDelete = (id) => {
    setTodos(todos.filter((to) => to.id !== id));
  };

  const onComplete = (id) => {
    let complete = todos.map((to) => {
      if (to.id === id) {
        return { ...to, status: !to.status };
      }
      return to;
    });
    setTodos(complete);
  };

  const onEdit = (id) => {
    const editTodo = todos.find((to) => to.id === id);
    setTodo(editTodo.list);
    setEditID(editTodo.id);
  };

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div className="inputandbtndiv">
          <input
            type="text"
            value={todo}
            ref={inputRef}
            placeholder="Enter your todo"
            className="form-control inputfield"
            onChange={(event) => setTodo(event.target.value)}
          />
          <button onClick={addTodo}> {editId ? "EDIT" : "ADD"}</button>
        </div>
      </form>
      <button onClick={deleteAll}>clear</button>
      <div className="list">
        <ul>
          {todos.map((to) => {
            return (
              <li className="list-items">
                <div
                  className="list-item-list"
                  id={to.status ? "list-item" : ""}
                >
                  {to.list}
                </div>
                <span>
                  <IoMdDoneAll
                    className="list-item-icons"
                    id="complete"
                    title="Complete"
                    onClick={() => onComplete(to.id)}
                  />
                  <FiEdit
                    className="list-item-icons"
                    id="edit"
                    title="Edit"
                    onClick={() => onEdit(to.id)}
                  />
                  <MdDelete
                    className="list-item-icons"
                    id="delete"
                    title="Delete"
                    onClick={() => onDelete(to.id)}
                  />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
