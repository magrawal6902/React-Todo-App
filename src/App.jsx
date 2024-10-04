import { useState } from "react";
import Create from "./components/Create";
import Header from "./components/Header";
import Show from "./components/Show";

const App = () => {
    // temperory db
    const [tasks, settasks] = useState([]);

    return (
        <div className=" border-t-2 w-screen h-screen bg-zinc-800 flex  items-center flex-col">
            <Header tasks={tasks} />
            <Create tasks={tasks} settasks={settasks} />
            <Show tasks={tasks} settasks={settasks} />
        </div>
    );
};

export default App;
