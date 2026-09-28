import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Выучить React', completed: true },
    { id: 2, text: 'Сделать чеклист', completed: false }
  ])
  const [text, setText] = useState('')
  const [editId, setEditId] = useState(null)
  const [editText, setEditText] = useState('')

  function addTodo(e) {
    e.preventDefault()
    if (!text.trim()) return
    setTodos([...todos, { id: Date.now(), text: text.trim(), completed: false }])
    setText('')
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    )
  }

  function startEdit(todo) {
    setEditId(todo.id)
    setEditText(todo.text)
  }

  function saveEdit(id) {
    if (!editText.trim()) return
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, text: editText.trim() } : t))
    )
    setEditId(null)
  }

  return (
    <div className="app">
      <h1>Чеклист</h1>

      <form onSubmit={addTodo} className="form">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новое дело"
        />
        <button type="submit">Добавить</button>
      </form>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="item">
            {editId === todo.id ? (
              <div className="edit-row">
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <button onClick={() => saveEdit(todo.id)}>Сохранить</button>
                <button onClick={() => setEditId(null)}>Отмена</button>
              </div>
            ) : (
              <div className="view-row">
                <label className="checkbox-wrap">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span className={todo.completed ? 'completed' : ''}>
                    {todo.text}
                  </span>
                </label>
                <div className="buttons">
                  <button onClick={() => startEdit(todo)}>Редактировать</button>
                  <button onClick={() => deleteTodo(todo.id)}>Удалить</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App