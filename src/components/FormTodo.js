import { useRef, useState } from "react"

function FormTodo({taskState, setCalling, create}) {
    const [name, setName] = useState('')
    const [date, setDate] = useState('')
    const inputRef = useRef()
    const [task, setTask] = taskState

    const handleCreate = async () => {
        const todo = {
            name,
            deadline: date,
            isDone:false
        }
        const res = await fetch('http://localhost:3100/addTodo', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(todo)
        })
        if (res.ok) {
            setCalling(prev => prev+1)
            setName('')
            inputRef.current.focus()
        }
    }

    const handleUpdate = async (id) => {
        const res = await fetch(`http://localhost:3100/updateTodo/${id}`, {
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                isDone: false,
                name,
                date
            })
        })
        if (res.ok) {
            setCalling(prev => prev +1)
            setTask('create')
        }
    }

    return (
        <div style={{marginLeft:'96px'}}>
            <input
                ref={inputRef}
                value={name}
                placeholder="todo name"
                onChange={e => setName(e.target.value)}
            />
            <input
                type='date'
                value={date}
                onChange={e => setDate(e.target.value)}
            />
            {
                create ?
                <button onClick={handleCreate} >Create</button> :
                <div style={{display:'inline'}}>
                    <button onClick={() => handleUpdate(task)} >Update</button>
                    <button onClick={() => setTask('create')}>Close</button>
                </div>
            }
        </div>
    )
}

export default FormTodo