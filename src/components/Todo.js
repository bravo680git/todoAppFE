import { useState } from "react"
import FormTodo from "./FormTodo"

function Todo({todo, setCalling, taskState}) {
    const [isDone, setIsDone] = useState(todo.isDone)
    const [task, setTask] = taskState

    const handleCheck = async (id) => {
        const res = await fetch(`http://localhost:3100/updateTodo/${id}`, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                ...todo,
                isDone: !isDone
            })
        })
        if (res.ok) {
            setIsDone(!isDone)
            setCalling(prev => prev +1)
        }
    }

    const handleDelete = async (id) => {
        const res = await fetch(`http://localhost:3100/deleteTodo/${id}`, {
            method:'DELETE'
        })
        if (res.ok) {
            setCalling(prev => prev +1)
        }
    }

    return (
        <div style={{marginBottom:'10px'}}>
            <input 
                style={{fontSize:'20px'}}
                type="checkbox"
                checked={isDone}
                onChange={() => handleCheck(todo._id)}
            />
            <span style={{fontSize:'20px', width:'400px', display:'inline-block', marginLeft:'10px'}}>{todo.name}</span>
            <span style={{marginRight:'10px'}}>{todo.deadline.slice(0,10)}</span>
            <button onClick={() => handleDelete(todo._id)} >Delete</button>
            {
                task === todo._id ?
                <FormTodo taskState={[task, setTask]} setCalling={setCalling}/> :
                <button onClick={() => setTask(todo._id)}>Update</button> 
            }
        </div>
    )
}

export default Todo