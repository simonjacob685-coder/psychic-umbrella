// Tutorial Data
const tutorials = [
    {
        id: 1,
        category: 'Programming',
        title: 'Python Fundamentals',
        description: 'Learn the basics of Python programming',
        icon: '🐍',
        lessons: 25,
        hours: 15,
        level: 'Beginner'
    },
    {
        id: 2,
        category: 'Web Development',
        title: 'HTML & CSS Basics',
        description: 'Master the foundation of web development',
        icon: '🌐',
        lessons: 20,
        hours: 12,
        level: 'Beginner'
    },
    {
        id: 3,
        category: 'Programming',
        title: 'JavaScript Advanced',
        description: 'Deep dive into JavaScript concepts',
        icon: '⚡',
        lessons: 30,
        hours: 20,
        level: 'Advanced'
    },
    {
        id: 4,
        category: 'Hardware',
        title: 'Computer Architecture',
        description: 'Understand CPU, GPU, and RAM',
        icon: '💾',
        lessons: 15,
        hours: 10,
        level: 'Intermediate'
    },
    {
        id: 5,
        category: 'Networking',
        title: 'Network Basics',
        description: 'Learn networking fundamentals',
        icon: '🔗',
        lessons: 18,
        hours: 12,
        level: 'Beginner'
    },
    {
        id: 6,
        category: 'Cybersecurity',
        title: 'Security Fundamentals',
        description: 'Introduction to cybersecurity',
        icon: '🔒',
        lessons: 22,
        hours: 14,
        level: 'Intermediate'
    },
    {
        id: 7,
        category: 'Operating Systems',
        title: 'Linux Essentials',
        description: 'Master Linux command line',
        icon: '🖥️',
        lessons: 24,
        hours: 16,
        level: 'Intermediate'
    },
    {
        id: 8,
        category: 'General Basics',
        title: 'Computer Basics 101',
        description: 'Perfect for complete beginners',
        icon: '📚',
        lessons: 12,
        hours: 8,
        level: 'Beginner'
    },
    {
        id: 9,
        category: 'Web Development',
        title: 'React & Modern JS',
        description: 'Build interactive web applications',
        icon: '⚛️',
        lessons: 28,
        hours: 18,
        level: 'Advanced'
    }
];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    renderTutorials();
    initializeDashboard();
    init3DCanvas();
});

// Render tutorial cards
function renderTutorials() {
    const grid = document.getElementById('tutorialGrid');
    grid.innerHTML = tutorials.map(tutorial => `
        <div class="tutorial-card" onclick="enrollCourse(${tutorial.id})">
            <div class="tutorial-card-header">${tutorial.icon}</div>
            <div class="tutorial-card-content">
                <div style="color: #0ea5e9; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem;">${tutorial.category}</div>
                <h3 class="tutorial-card-title">${tutorial.title}</h3>
                <p class="tutorial-card-description">${tutorial.description}</p>
                <div class="tutorial-card-stats">
                    <div class="stat">
                        <div class="stat-label">Lessons</div>
                        <div class="stat-value">${tutorial.lessons}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Hours</div>
                        <div class="stat-value">${tutorial.hours}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Level</div>
                        <div class="stat-value" style="font-size: 0.9rem;">${tutorial.level}</div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Search functionality
function searchTutorials() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const resultsDiv = document.getElementById('searchResults');
    
    if (query.length === 0) {
        resultsDiv.innerHTML = '';
        return;
    }
    
    const results = tutorials.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.category.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query)
    );
    
    if (results.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align: center; color: #64748b;">No tutorials found</p>';
        return;
    }
    
    resultsDiv.innerHTML = results.map(t => `
        <div class="search-result-item" onclick="scrollToTutorials(); searchTutorials(); enrollCourse(${t.id})">
            <strong>${t.icon} ${t.title}</strong>
            <p style="color: #64748b; font-size: 0.9rem;">${t.description}</p>
        </div>
    `).join('');
}

function scrollToTutorials() {
    document.getElementById('tutorials').scrollIntoView({behavior: 'smooth'});
}

// Newsletter subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = document.getElementById('emailInput').value;
    const messageDiv = document.getElementById('newsletterMessage');
    
    if (email) {
        // Simulate email sending
        messageDiv.className = 'message success';
        messageDiv.textContent = '✓ Thank you for subscribing! Check your email for confirmation.';
        document.getElementById('emailInput').value = '';
        
        // Store subscription
        let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('subscribers', JSON.stringify(subscribers));
        }
        
        setTimeout(() => messageDiv.textContent = '', 5000);
    }
}

// Enroll in course
function enrollCourse(courseId) {
    let enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    if (!enrolled.includes(courseId)) {
        enrolled.push(courseId);
        localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
        updateDashboard();
    }
}

// Initialize dashboard
function initializeDashboard() {
    updateDashboard();
}

function updateDashboard() {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    const completed = JSON.parse(localStorage.getItem('completedCourses') || '[]');
    
    document.getElementById('enrolledCount').textContent = enrolled.length;
    document.getElementById('completedCount').textContent = completed.length;
    document.getElementById('hoursLearned').textContent = (completed.length * 5).toString();
    document.getElementById('achievements').textContent = Math.floor(completed.length / 2);
}

// Download certificate
function downloadCertificate() {
    const completed = JSON.parse(localStorage.getItem('completedCourses') || '[]');
    
    if (completed.length === 0) {
        alert('Complete at least one course to download a certificate!');
        return;
    }
    
    const certificateContent = `
        ═══════════════════════════════════════════════════
        CERTIFICATE OF COMPLETION
        ═══════════════════════════════════════════════════
        
        This certifies that
        
        ${getStudentName()}
        
        Has successfully completed ${completed.length} course(s) on
        TechLearn Pro
        
        Date: ${new Date().toLocaleDateString()}
        
        ═══════════════════════════════════════════════════
    `;
    
    downloadFile('certificate.txt', certificateContent);
}

function getStudentName() {
    const contactData = JSON.parse(localStorage.getItem('contactData') || '{}');
    return contactData.name || 'Student';
}

function downloadFile(filename, content) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Contact form submission
function submitContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    const messageDiv = document.getElementById('contactMessage');
    
    // Store contact data
    const contactData = { name, email, subject, message, timestamp: new Date().toLocaleString() };
    localStorage.setItem('contactData', JSON.stringify(contactData));
    
    // Simulate email sending
    messageDiv.className = 'message success';
    messageDiv.textContent = '✓ Your message has been sent successfully! We will get back to you soon.';
    
    // Reset form
    document.querySelector('.contact-form').reset();
    
    setTimeout(() => messageDiv.textContent = '', 5000);
}

// 3D Canvas initialization (using basic canvas for fallback)
function init3DCanvas() {
    const canvases = document.querySelectorAll('.three-d-canvas');
    canvases.forEach(canvas => {
        if (!canvas.hasChildNodes() || canvas.textContent.includes('3D')) {
            canvas.innerHTML = '<div style="text-align: center; color: white;">🎨 Interactive 3D Visualization<br/><small>(Loading Three.js...)</small></div>';
        }
    });
}

// Rotate 3D model
function rotateModel() {
    const canvas = document.getElementById('3d-canvas');
    canvas.style.animation = 'spin 2s linear infinite';
    
    // Add spin animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            from { transform: rotateY(0deg); }
            to { transform: rotateY(360deg); }
        }
    `;
    if (!document.querySelector('style[data-spin]')) {
        style.setAttribute('data-spin', 'true');
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        canvas.style.animation = 'none';
    }, 2000);
}

// Mobile menu toggle
document.getElementById('hamburger')?.addEventListener('click', function() {
    const menu = document.querySelector('.nav-menu');
    menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
});