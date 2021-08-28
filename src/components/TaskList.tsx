import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [messageAlert, setMessageAlert] = useState('')

  console.log(tasks);

  function handleCreateNewTask() {
    setMessageAlert('');
    setNewTaskTitle('');
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(newTaskTitle.trim() === ''){
      setMessageAlert('Ops, digite o nome da task!')
      return;
    }

    const taskData = {
      id: Date.now(),
      title: newTaskTitle,
      isComplete: false,
    }

    setTasks([...tasks, taskData]);

  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
     tasks.map((task, index) => {
       if(task.id === id ){
        tasks[index].isComplete = !task.isComplete;
        setTasks([...tasks]);
       }
      })
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    const currentTasks = tasks.filter(task => task.id !== id);
    setTasks([...currentTasks]);

  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          {messageAlert && <span style={{ color: 'red', fontSize: '14px' }}>{messageAlert}</span>}
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => {setNewTaskTitle(e.target.value); setMessageAlert('')}}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}