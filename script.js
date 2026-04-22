const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const categorySelect = document.getElementById("category");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  const category = categorySelect.value;

  if (taskText === "") return;

  const li = document.createElement("li");
  li.setAttribute("data-category", category);

  const span = document.createElement("span");
  span.textContent = taskText;

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
}

/* FILTROS */
const filters = document.querySelectorAll(".sidebar li");

filters.forEach(filter => {
  filter.addEventListener("click", () => {

    document.querySelector(".active").classList.remove("active");
    filter.classList.add("active");

    const selected = filter.getAttribute("data-filter");

    const tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
      const category = task.getAttribute("data-category");

      if (selected === "all" || category === selected) {
        task.style.display = "";
      } else {
        task.style.display = "none";
      }
    });

  });
});