import { useState, useEffect } from 'react'
import './App.css'
import { getTasks, addTask, completeTask } from './api'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getTasks()
      setTasks(data)
    } catch {
      setError('Failed to fetch tasks')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Add task
  const handleAdd = async (e) => {
    e.preventDefault()
    setError('')
    if (!title || !description) {
      setError('Title and description required')
      return
    }
    try {
      await addTask(title, description)
      setTitle('')
      setDescription('')
      fetchTasks()
    } catch {
      setError('Failed to add task')
    }
  }

  // Mark as done
  const handleDone = async (id) => {
    setError('')
    try {
      await completeTask(id)
      fetchTasks()
    } catch {
      setError('Failed to mark as done')
    }
  }

  return (
    <div className="todo-container">
      <div className="add-task">
        <h2>Add a Task</h2>
        <form onSubmit={handleAdd}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <button type="submit">Add</button>
        </form>
        {error && <div className="error">{error}</div>}
      </div>
      <div className="divider"></div>
      <div className="task-list">
        {loading ? (
          <p>Loading...</p>
        ) : tasks.length === 0 ? (
          <div className="no-tasks">No tasks yet. Add your first task!</div>
        ) : (
          tasks.map(task => (
            <div className="task-card" key={task.id}>
              <div>
                <strong>{task.title}</strong>
                <div className="desc">{task.description}</div>
              </div>
              <button onClick={() => handleDone(task.id)}>Done</button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default App
