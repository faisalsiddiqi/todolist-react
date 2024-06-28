import { useState } from "react";
import "beercss";
import "material-dynamic-colors";
import "./TodoList.Module.css";

function TodoList() {
  const [TaskList, setTaskList] = useState([]);

  const [NewTask, setNewTask] = useState("");

  const [DarkMode, setDarkMode] = useState(false);

  function DarkModeSwitch() {
    let BodyMode = document.querySelector(".Modes");
    if (!DarkMode) {
      BodyMode.classList.add("dark");
      setDarkMode(true);
      console.log(DarkMode);
    } else {
      BodyMode.classList.remove("dark");
      setDarkMode(false);
      console.log(DarkMode);
    }
  }

  function NewTaskAdd(Event) {
    setNewTask(Event.target.value);
  }

  function AddTaskHandler() {
    if (NewTask.trim() !== "") {
      setTaskList((T) => [...T, NewTask]);
    }
  }

  function DeleteTask(Element) {
    const DeletedTaskList = TaskList.filter((e) => e !== Element);
    setTaskList(DeletedTaskList);
  }

  function PriorityUp(index) {
    if (index > 0) {
      let UpdatedTaskList = [...TaskList];
      let temp = UpdatedTaskList[index - 1];
      UpdatedTaskList[index - 1] = UpdatedTaskList[index];
      UpdatedTaskList[index] = temp;
      setTaskList(UpdatedTaskList);
      // console.log(UpdatedTaskList);
    }
  }

  function PriorityDown(index) {
    if (index !== TaskList.length - 1) {
      let UpdatedTaskList = [...TaskList];
      let temp = UpdatedTaskList[index + 1];
      UpdatedTaskList[index + 1] = UpdatedTaskList[index];
      UpdatedTaskList[index] = temp;
      setTaskList(UpdatedTaskList);
      // console.log(UpdatedTaskList);
    }
  }


  const TaskListDisplay = TaskList.map((Element, index) => (
    <>
      <div className="full-task-card">
        {/* this is the list generating */}
        <a className="row padding">
          <div className="max">
            <li className="small">
              <p key={index}>
                <p>{Element}</p>
              </p>
            </li>
          </div>
          <nav className="no-space">
            <button
              className="border left-round"
              onClick={() => DeleteTask(Element)}
            >
              <i>Delete</i>
            </button>
            <button
              className="border no-round"
              onClick={() => PriorityUp(index)}
            >
              <a>⬆</a>
            </button>
            <button
              className="border no-round"
              onClick={() => PriorityDown(index)}
            >
              <a>⬇</a>
            </button>
            <button className="border right-round">
              C
              <menu className="no-wrap">
                <a>Work</a>
                <a>Personal</a>
              </menu>
            </button>
          </nav>
        </a>
      </div>
    </>
  ));

  return (
    <>
      <main className="TodoListBox">
        <div className="header">
          <h1>TODO LIST</h1>

          <label className="radio icon">
            <input
              type="Checkbox"
              name="radio3_"
              value="dark"
              onChange={DarkModeSwitch}
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
            <input onChange={(Event) => NewTaskAdd(Event)} type="text" />
            <button
              className="extend circle right-round primary"
              onClick={AddTaskHandler}
            >
              <i>add</i>
              <span>Add Task</span>
            </button>
          </div>
        </div>

        <div className="ListDisplayer">{TaskListDisplay}</div>
      </main>
    </>
  );
}

export default TodoList;
