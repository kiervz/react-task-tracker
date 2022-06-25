import React, { useState }from 'react'
import Header from "./components/Header";
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Learn React",
      day: "July 25, 2022",
      reminder: false
    },
    {
      id: 2,
      text: "Learn React Hooks",
      day: "July 26, 2022",
      reminder: true
    },
    {
      id: 3,
      text: "Learn Redux",
      day: "July 27, 2022",
      reminder: false
    }
  ]);

  const addTask = (task) => {
    let id = (tasks.length) + 2;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: !task.reminder} : task
    ))
  }

  return (
    <div className="container">
      <Header 
        title="Task Tracker" 
        showAdd={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)} />
      { showAddTask && <AddTask  onAdd={addTask} /> }
      {
        tasks.length > 0 ? 
        <Tasks 
          tasks={tasks} 
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
          />
        : <p style={{textAlign: 'center'}}>No tasks found.</p>
      }
    </div>
  );
}

export default App;
