# Todo List Application 📝

A fully functional, professional todo list application built with vanilla HTML, CSS, and JavaScript. Features local storage functionality to persist tasks across browser sessions.

## ✨ Features

- ✅ **Add Tasks** - Quickly add new tasks with validation
- ✏️ **Edit Tasks** - Modify existing tasks inline
- 🗑️ **Delete Tasks** - Remove individual tasks or all at once
- ✓ **Complete/Uncomplete Tasks** - Mark tasks as done with visual feedback
- 🔍 **Filter Tasks** - View All, Active, or Completed tasks
- 💾 **Local Storage** - Tasks persist automatically across browser sessions
- 📊 **Statistics** - View total, active, and completed task counts
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- ⌨️ **Keyboard Support** - Press Enter to add tasks

## 🚀 Quick Start

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start adding your tasks!

## 📋 How to Use

### Adding a Task
1. Type your task in the input field
2. Click "Add Task" or press Enter
3. Task appears in the list immediately

### Managing Tasks
- **Complete a Task** - Click the checkbox next to the task
- **Edit a Task** - Click the "Edit" button and modify the text
- **Delete a Task** - Click the "Delete" button
- **Clear Completed** - Remove all completed tasks at once
- **Delete All** - Remove all tasks (use with caution!)

### Filtering Tasks
- Click "All" to see all tasks
- Click "Active" to see only incomplete tasks
- Click "Completed" to see only finished tasks

### Statistics
- **Total** - Total number of tasks
- **Active** - Number of incomplete tasks
- **Completed** - Number of completed tasks

## 💾 Local Storage

Your tasks are automatically saved to your browser's local storage. This means:
- Tasks persist when you refresh the page
- Tasks persist when you close and reopen the browser
- Tasks are stored locally on your device (not on a server)
- Clearing browser data will delete your tasks

## 🛠️ Technical Details

### Technologies Used
- **HTML5** - Semantic structure
- **CSS3** - Modern styling with gradients and animations
- **JavaScript (Vanilla)** - No frameworks or libraries required
- **Local Storage API** - For data persistence

### File Structure
```
psychic-umbrella/
├── index.html      # HTML structure
├── styles.css      # Styling and animations
├── script.js       # Application logic and local storage
└── README.md       # This file
```

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Any modern browser with ES6 support

## 🎨 Customization

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #4f46e5;
    --secondary-color: #10b981;
    --danger-color: #ef4444;
    /* ... more variables ... */
}
```

### Change Fonts
Modify the font-family in `styles.css`:
```css
body {
    font-family: 'Your Font Here', sans-serif;
}
```

## 🔒 Data Privacy

- All data is stored locally in your browser
- No server-side storage or transmission
- No tracking or analytics
- No external API calls
- Your tasks remain completely private

## 🐛 Known Limitations

- Tasks are limited to 200 characters per task
- Local storage is browser-specific (tasks don't sync across devices)
- Clearing browser cache will delete stored tasks
- Storage capacity depends on browser (typically 5-10MB)

## 🚀 Future Enhancements

Potential features for future versions:
- Cloud sync (Firebase/Supabase)
- Task categories/tags
- Priority levels
- Due dates and reminders
- Dark mode toggle
- Import/Export tasks
- Multi-device synchronization
- Task notes and descriptions

## 📝 License

This project is open source and available for personal and commercial use.

## 👨‍💻 Author

Created by simonjacob685-coder

---

**Enjoy organizing your tasks! 🎉**
