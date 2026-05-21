// Todo List Application with Local Storage

class TodoApp {
    constructor() {
        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.clearCompletedBtn = document.getElementById('clearCompleted');
        this.clearAllBtn = document.getElementById('clearAll');
        this.filterBtns = document.querySelectorAll('.filter-btn');

        // Stats elements
        this.totalTasksEl = document.getElementById('totalTasks');
        this.activeTasksEl = document.getElementById('activeTasks');
        this.completedTasksEl = document.getElementById('completedTasks');

        // State
        this.todos = [];
        this.currentFilter = 'all';

        // Initialize
        this.init();
    }

    init() {
        this.loadFromLocalStorage();
        this.render();
        this.attachEventListeners();
    }

    attachEventListeners() {
        // Add task on button click
        this.addBtn.addEventListener('click', () => this.addTodo());

        // Add task on Enter key
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        // Filter buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });

        // Clear buttons
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.clearAllBtn.addEventListener('click', () => this.clearAll());
    }

    addTodo() {
        const text = this.todoInput.value.trim();

        if (text === '') {
            this.shake(this.todoInput);
            return;
        }

        if (text.length > 200) {
            alert('Task is too long! Maximum 200 characters.');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toLocaleString()
        };

        this.todos.push(todo);
        this.todoInput.value = '';
        this.todoInput.focus();

        this.saveToLocalStorage();
        this.render();
    }

    deleteTodo(id) {
        if (confirm('Are you sure you want to delete this task?')) {
            this.todos = this.todos.filter(todo => todo.id !== id);
            this.saveToLocalStorage();
            this.render();
        }
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToLocalStorage();
            this.render();
        }
    }

    editTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (!todo) return;

        const newText = prompt('Edit your task:', todo.text);
        if (newText !== null && newText.trim() !== '') {
            if (newText.length > 200) {
                alert('Task is too long! Maximum 200 characters.');
                return;
            }
            todo.text = newText.trim();
            this.saveToLocalStorage();
            this.render();
        }
    }

    clearCompleted() {
        const completedCount = this.todos.filter(t => t.completed).length;
        if (completedCount === 0) {
            alert('No completed tasks to clear.');
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.todos = this.todos.filter(todo => !todo.completed);
            this.saveToLocalStorage();
            this.render();
        }
    }

    clearAll() {
        if (this.todos.length === 0) {
            alert('No tasks to delete.');
            return;
        }

        if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
            this.todos = [];
            this.saveToLocalStorage();
            this.render();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    updateStats() {
        const total = this.todos.length;
        const active = this.todos.filter(t => !t.completed).length;
        const completed = this.todos.filter(t => t.completed).length;

        this.totalTasksEl.textContent = total;
        this.activeTasksEl.textContent = active;
        this.completedTasksEl.textContent = completed;
    }

    render() {
        this.updateStats();
        const filteredTodos = this.getFilteredTodos();

        // Show/hide empty state
        if (this.todos.length === 0) {
            this.emptyState.classList.add('show');
            this.todoList.innerHTML = '';
        } else if (filteredTodos.length === 0) {
            this.emptyState.innerHTML = `<p>📭 No ${this.currentFilter} tasks.</p>`;
            this.emptyState.classList.add('show');
            this.todoList.innerHTML = '';
        } else {
            this.emptyState.classList.remove('show');
            this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');
            this.attachTodoEventListeners();
        }
    }

    createTodoElement(todo) {
        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${todo.completed ? 'checked' : ''}
                    data-id="${todo.id}"
                >
                <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                <div class="todo-actions">
                    <button class="btn-edit" data-id="${todo.id}">Edit</button>
                    <button class="btn-delete" data-id="${todo.id}">Delete</button>
                </div>
            </div>
        `;
    }

    attachTodoEventListeners() {
        // Checkbox toggles
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleTodo(parseInt(e.target.dataset.id));
            });
        });

        // Edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.editTodo(parseInt(e.target.dataset.id));
            });
        });

        // Delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.deleteTodo(parseInt(e.target.dataset.id));
            });
        });
    }

    saveToLocalStorage() {
        try {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            alert('Failed to save tasks. Your browser may not support local storage.');
        }
    }

    loadFromLocalStorage() {
        try {
            const stored = localStorage.getItem('todos');
            this.todos = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.todos = [];
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    shake(element) {
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = 'shake 0.5s';
        }, 10);
    }
}

// Add shake animation to styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
