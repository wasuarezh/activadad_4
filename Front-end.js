// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:3001/tasks');
    setTasks(response.data);
  };

  const addTask = async () => {
    const response = await axios.post('http://localhost:3001/tasks', {
      id: Date.now(),
      title: newTask,
      completed: false
    });
    setTasks([...tasks, response.data]);
    setNewTask('');
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3001/tasks/${taskId}`);
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
