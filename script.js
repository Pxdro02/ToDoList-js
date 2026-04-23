const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("category");
const prioritySelect = document.getElementById("priority");
const deadlineInput = document.getElementById("deadline");

let tasks = [];

// Carregar ao iniciar
window.addEventListener("load", () => {
  const storedTasks = localStorage.getItem("tasks");

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach(task => renderTask(task));
  }
});

addTaskBtn.addEventListener("click", addTask);

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;
  const deadline = deadlineInput.value || null;

  if (taskText === "") return;

  const task = {
    id: Date.now(),
    title: taskText,
    description: "",
    status: "pending",
    priority: priority,
    category: category,
    createdAt: new Date(),
    deadline: deadline
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);

  taskInput.value = "";
}

function renderTask(task) {
  const li = document.createElement("li");
  li.setAttribute("data-category", task.category);
  li.setAttribute("data-id", task.id);

  if (task.status === "done") {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.textContent = task.title;

  span.addEventListener("click", () => {
    li.classList.toggle("completed");

    task.status = li.classList.contains("completed") ? "done" : "pending";
    updateTask(task.id, task);
  });

  const info = document.createElement("small");
  info.textContent = `Prioridade: ${task.priority}`;
  info.classList.add(`priority-${task.priority}`);

  if (task.deadline) {
    const date = document.createElement("small");
    date.textContent = `Prazo: ${task.deadline}`;
    li.appendChild(date);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑️";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();

    li.remove();
  });

  li.appendChild(span);
  li.appendChild(info);
  li.appendChild(deleteBtn);

  taskList.appendChild(li);
}

function updateTask(id, updatedTask) {
  tasks = tasks.map(task => task.id === id ? updatedTask : task);
  saveTasks();
}

/* FILTROS */
const filters = document.querySelectorAll(".sidebar li");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    document.querySelector(".active").classList.remove("active");
    filter.classList.add("active");

    const selected = filter.getAttribute("data-filter");
    const tasksDOM = document.querySelectorAll("#taskList li");

    tasksDOM.forEach(task => {
      const category = task.getAttribute("data-category");

      if (selected === "all" || category === selected) {
        task.style.display = "";
      } else {
        task.style.display = "none";
      }
    });

  });
});