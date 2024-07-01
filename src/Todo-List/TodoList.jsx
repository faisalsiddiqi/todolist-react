import { useState } from "react";
import "beercss";
import "material-dynamic-colors";
import "./TodoList.Module.css";

function TodoList() {
  const [taskList, setTaskList] = useState([]);

  const [newTask, setNewTask] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [filteredTaskList, setFilteredTaskList] = useState(taskList);
  const [filterCategory, setFilterCategory] = useState("");

  function darkModeSwitch() {
    let bodyMode = document.querySelector(".Modes");
    if (!darkMode) {
      bodyMode.classList.add("dark");
      setDarkMode(true);
    } else {
      bodyMode.classList.remove("dark");
      setDarkMode(false);
    }
  }

  function newTaskAdd(event) {
    setNewTask(event.target.value);
  }

  function addTaskHandler(category) {
    if (newTask.trim() === "") return;
    const newTaskWithCategory = { name: newTask, category };
    setTaskList((prevTaskList) => [...prevTaskList, newTaskWithCategory]);
    setNewTask("");
    if (filterCategory === "" || filterCategory === category) {
      setFilteredTaskList((prevFilteredTaskList) => [
        ...prevFilteredTaskList,
        newTaskWithCategory,
      ]);
    }
  }

  function deleteTask(element) {
    const updatedTaskList = taskList.filter((e) => e.name !== element.name);
    setTaskList(updatedTaskList);
    setFilteredTaskList(
      updatedTaskList.filter(
        (e) => e.category === filterCategory || filterCategory === ""
      )
    );
  }

  function priorityUp(index) {
    if (index > 0) {
      let updatedTaskList = [...taskList];
      let temp = updatedTaskList[index - 1];
      updatedTaskList[index - 1] = updatedTaskList[index];
      updatedTaskList[index] = temp;
      setTaskList(updatedTaskList);
      setFilteredTaskList(
        updatedTaskList.filter(
          (e) => e.category === filterCategory || filterCategory === ""
        )
      );
    }
  }

  function priorityDown(index) {
    if (index !== taskList.length - 1) {
      let updatedTaskList = [...taskList];
      let temp = updatedTaskList[index + 1];
      updatedTaskList[index + 1] = updatedTaskList[index];
      updatedTaskList[index] = temp;
      setTaskList(updatedTaskList);
      setFilteredTaskList(
        updatedTaskList.filter(
          (e) => e.category === filterCategory || filterCategory === ""
        )
      );
    }
  }

  function filterHandler(e) {
    const selectedCategory = e.target.value;
    setFilterCategory(selectedCategory);
    if (selectedCategory === "") {
      setFilteredTaskList(taskList);
    } else {
      setFilteredTaskList(
        taskList.filter((element) => element.category === selectedCategory)
      );
    }
  }

  const taskListDisplay = filteredTaskList.map((element, index) => (
    <div className="full-task-card" key={index}>
      <div className="row padding">
        <div className="max">
          <li className="small">
            <h2>{element.name}</h2>
            <p>{element.category}</p>
          </li>
        </div>
        <nav className="no-space">
          <button
            className="border left-round"
            onClick={() => deleteTask(element)}
          >
            <i>Delete</i>
          </button>
          <button className="border no-round" onClick={() => priorityUp(index)}>
            <a>⬆</a>
          </button>
          <button
            className="border right-round"
            onClick={() => priorityDown(index)}
          >
            <a>⬇</a>
          </button>
        </nav>
      </div>
    </div>
  ));

  return (
    <main className="TodoListBox">
      <div className="header">
        <h1>TODO LIST</h1>
        <label className="radio icon">
          <input
            type="checkbox"
            name="radio3_"
            value="dark"
            onChange={darkModeSwitch}
          />
          <span>
            <i>light_mode</i>
            <i>dark_mode</i>
          </span>
          <p>Dark Mode</p>
        </label>
      </div>

      <div>
        <div className="InputCss">
          <input value={newTask} onChange={newTaskAdd} type="text" />
          <button
            className="extend square"
            onClick={() => addTaskHandler("work")}
          >
            <i>Work</i>
            <span>Add Work Task</span>
          </button>
          <button
            className="extend circle right-round primary"
            onClick={() => addTaskHandler("personal")}
          >
            <i>person</i>
            <span>Add Personal Task</span>
          </button>
        </div>
        <div className="field suffix border round">
          <select onChange={filterHandler}>
            <option value="">All</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
          </select>
          <i>arrow_drop_down</i>
        </div>
      </div>

      <div className="ListDisplayer">{taskListDisplay}</div>
    </main>
  );
}

export default TodoList;
