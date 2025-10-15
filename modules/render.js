import { escapeHTML } from './validation.js';

export function renderTaskList(taskListElement, tasks) {
  taskListElement.innerHTML = '';

  if (tasks.length === 0) {
    taskListElement.innerHTML = `
      <li class="empty-state fade-in">
        <img src="images/empty-tasks.svg" alt="No tasks">
        <p>Add your first task!</p>
      </li>`;
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = `task fade-in ${task.completed ? 'completed' : ''}`;
    li.dataset.id = task.id;
    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${escapeHTML(task.text)}</span>
      </label>
      <div class="task-actions">
        <button class="delete-btn" title="Delete Task">🗑</button>
      </div>`;
    taskListElement.appendChild(li);
  });
}
