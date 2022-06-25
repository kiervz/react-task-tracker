import React from 'react'
import { FaTimes } from 'react-icons/fa'

const Task = ({task, onDelete, toggleReminder}) => {
  return (
    <div 
        onDoubleClick={() => toggleReminder(task.id)}
        className={`task ${task.reminder ? 'reminder' : ''}`}
        >
        <h3>
            {task.text} 
            <FaTimes 
                style={{ color: "red" }} 
                onClick={() => onDelete(task.id)}
                />
        </h3>
        <p>{task.day}</p>
    </div>
  )
}

export default Task
