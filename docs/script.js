// 從本地存儲加載待辦事項
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// 初始化頁面
window.onload = function() {
    renderTasks();
};

// 新增任務
function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text) {
        const task = {
            id: Date.now(),
            text: text,
            completed: false
        };
        
        tasks.push(task);
        saveTasks();
        renderTasks();
        input.value = '';
    }
}

// 切換任務完成狀態
function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

// 刪除任務
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// 儲存任務到本地存儲
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// 渲染任務列表
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" 
                   ${task.completed ? 'checked' : ''} 
                   onclick="toggleTask(${task.id})">
            <span class="task-text ${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">刪除</button>
        `;
        taskList.appendChild(li);
    });
}

// 監聽Enter鍵
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
}); 