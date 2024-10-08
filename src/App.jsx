import { nanoid } from "nanoid";
import { useState } from "react";
import "./App.css"

const App = () => {
  const [Title, setTitle] = useState("");
  const [Tasks, setTasks] = useState([]);
  const [Index, setIndex] = useState(-1);

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (Title.length <= 0) {
      return alert("Cannot Create Empty Task");
    }
    const task = {
      title: Title,
      completed: false,
      id: nanoid(),
    };
    const copyTasks = [...Tasks];
    if (Index !== -1) {
      copyTasks[Index] = task;
    } else {
      copyTasks.push(task);
    }
    setTasks(copyTasks);
    setTitle("");
  };

  const ToggleHandler = (index) => {
    const copyTasks = [...Tasks];
    copyTasks[index].completed = !copyTasks[index].completed;
    setTasks(copyTasks);
  };

  const DeleteHandler = (index) => {
    const copyTasks = [...Tasks];
    if (!copyTasks[index].completed) {
      if (confirm("Are you sure you want to delete an incomplete task?")) {
        copyTasks.splice(index, 1);
        setTasks(copyTasks);
      }
    } else {
      copyTasks.splice(index, 1);
      setTasks(copyTasks);
    }
  };

  const EditHandler = (index) => {
    setTitle(Tasks[index].title);
    setIndex(index);
  };

  return (
    <div className="border-t-2 w-screen h-screen bg-zinc-800 flex items-center flex-col">
      <div className="mt-[7%] w-full md:w-[40%] lg:w-[25%] h-[20%] border rounded-3xl flex justify-around items-center p-5">
        <div className="text-yellow-100 text-center">
          <h1 className="text-3xl font-bold"> LET'S TODO</h1>
          <p>Keeps doing things</p>
        </div>
        <div className="text-4xl font-extrabold flex justify-center items-center w-[120px] h-[120px] rounded-full bg-orange-600">
          {Tasks.filter((task) => task.completed).length}/{Tasks.length}
        </div>
      </div>

      <form
        className="w-full md:w-[40%] lg:w-[25%] flex justify-between px-5 my-[2%]"
        onSubmit={SubmitHandler}
      >
        <input
          placeholder="Write your next task..."
          className="px-5 py-3 text-yellow-100 outline-none w-[85%] rounded-xl bg-zinc-700"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={Title}
        />
        <button className="outline-none text-4xl font-extrabold flex justify-center items-center w-[50px] h-[50px] rounded-full bg-orange-600">
          <i className="ri-add-fill"></i>
        </button>
      </form>

      <ul className="list-none w-full md:w-[40%] lg:w-[25%]">
        {Tasks.length > 0 ? (
          Tasks.map((task, index) => {
            return (
              <li
                key={task.id}
                className="mb-5 flex justify-between items-center border rounded-xl p-5"
              >
                <div className="flex items-center">
                  <div
                    className={`${
                      task.completed
                        ? "bg-green-400"
                        : "border border-orange-600"
                    } mr-4 rounded-full w-[30px] h-[30px] cursor-pointer`}
                    onClick={() => ToggleHandler(index)}
                  ></div>
                  <h1
                    className={`${
                      task.completed ? "line-through" : ""
                    } text-2xl font-extrabold text-yellow-100`}
                  >
                    {task.title}
                  </h1>
                </div>
                <div className="flex gap-3 text-2xl text-yellow-100">
                  <i
                    className={`ri-file-edit-line ${
                      task.completed
                        ? "pointer-events-none cursor-not-allowed opacity-20"
                        : ""
                    }`}
                    onClick={() => EditHandler(index)}
                  ></i>
                  <i
                    className="ri-delete-bin-3-line cursor-pointer"
                    onClick={() => {
                      DeleteHandler(index);
                    }}
                  ></i>
                </div>
              </li>
            );
          })
        ) : (
          <h1 className="mt-5 text-yellow-100 text-2xl font-extrabold text-center">
            No Task Found
          </h1>
        )}
      </ul>
    </div>
  );
};

export default App;
