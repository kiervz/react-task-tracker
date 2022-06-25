import React, { useState, useEffect }from 'react'
import Header from "./components/Header";
import Tasks from './components/Tasks.js';
import AddTask from './components/AddTask';

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks');
    const data = await response.json();

    setTasks(data);
  }

  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await response.json();

    return data;
  }

  useEffect(() => {
    fetchTasks();
  }, [])

  const addTask = async (task) => {
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();
    setTasks([...tasks, data]);
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleReminder = async (id) => {
    const res = await fetchTask(id);
    const updatedTask = {...res, reminder: !res.reminder }

    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    });

    setTasks(tasks.map((task) => 
      task.id === id ? {...task, reminder: updatedTask.reminder} : task
    ));
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
