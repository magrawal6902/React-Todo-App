const Show = (props) => {
    const { tasks, settasks } = props;

    const ToggleHandler = (index) => {
        const copytasks = [...tasks];
        copytasks[index].completed = !copytasks[index].completed;
        settasks(copytasks);
    };

    const DeleteHandler = (index) => {
        if (tasks[index].completed || confirm("Are you sure ?")) {
            const copytasks = [...tasks];
            copytasks.splice(index, 1);
            settasks(copytasks);
        } else {
            alert("task not deleted!");
            return;
        }
    };

    let tasksRender = (
        <h1 className="mt-5 text-yellow-100 text-2xl font-extrabold text-center">
            No Task Found
        </h1>
    );
    if (tasks.length > 0) {
        tasksRender = tasks.map((task, index) => {
            return (
                <li
                    key={task.id}
                    className="mb-5 flex justify-between items-center border rounded-xl p-5"
                >
                    <div className="flex items-center">
                        <div
                            onClick={() => ToggleHandler(index)}
                            className={` ${
                                task.completed
                                    ? "bg-green-400"
                                    : "border border-orange-600"
                            } mr-4 rounded-full w-[30px] h-[30px]`}
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
                        <i className="ri-file-edit-line"></i>
                        <i
                            onClick={() => DeleteHandler(index)}
                            className="ri-delete-bin-3-line"
                        ></i>
                    </div>
                </li>
            );
        });
    }

    return <ul className="list-none w-[25%] ">{tasksRender}</ul>;
};

export default Show;
