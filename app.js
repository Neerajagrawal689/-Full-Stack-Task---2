import { loadTasks, saveTasks } from './modules/storage.js';
import { renderTaskList } from './modules/render.js';
import { validateTaskInput } from './modules/validation.js';

let tasks = loadTasks();
const taskList = document.getElementById('task-list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const stats = document.getElementById('task-stats');
const filters = document.querySelector('.filters');

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
}

function updateStats() {
  const completed = tasks.filter(t => t.completed).length;
  stats.textContent = `${tasks.length} tasks — ${completed} completed`;
}

// Initial render
renderTaskList(taskList, tasks);
updateStats();

// Add new task
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateTaskInput(input.value)) return;
  const newTask = createTask(input.value);
  tasks.push(newTask);
  saveTasks(tasks);
  renderTaskList(taskList, tasks);
  updateStats();
  input.value = '';
});

// Toggle & Delete via event delegation
taskList.addEventListener('click', e => {
  const taskElement = e.target.closest('.task');
  if (!taskElement) return;

  const id = Number(taskElement.dataset.id);
  const index = tasks.findIndex(t => t.id === id);

  if (e.target.type === 'checkbox') {
    tasks[index].completed = e.target.checked;
    saveTasks(tasks);
    renderTaskList(taskList, tasks);
    updateStats();
  }

  if (e.target.classList.contains('delete-btn')) {
    if (confirm('Delete this task?')) {
      tasks.splice(index, 1);
      saveTasks(tasks);
      renderTaskList(taskList, tasks);
      updateStats();
    }
  }
});

// Filter controls
filters.addEventListener('click', e => {
  if (!e.target.dataset.filter) return;
  document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
  e.target.classList.add('active');

  const filter = e.target.dataset.filter;
  let filtered = tasks;

  if (filter === 'active') filtered = tasks.filter(t => !t.completed);
  if (filter === 'completed') filtered = tasks.filter(t => t.completed);

  renderTaskList(taskList, filtered);
});
