const taskLists = document.querySelectorAll(".task-list");
const baclogTasks = document.querySelector("#backlog .task-list");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const submitButton = document.querySelector("#submit-button");
const errorContainer = document.querySelector(".error-container");

let tasks = [
  {
    id: 0,
    title: "Fix submit button",
    description:
      "The submit button has stopped woorking since the last release.",
  },
  {
    id: 1,
    title: "Change text on T and C's",
    description:
      "The terms and conditions need updating as per the business meeting.",
  },
  {
    id: 2,
    title: "Change banner picture",
    description:
      "Marketing has requested a new banner to be added to the website.",
  },
];
function eroorMessage(message) {
  let messageElement = document.createElement("p");
  messageElement.textContent = message;
  errorContainer.append(messageElement);
  setTimeout(() => {
    messageElement.remove();
  }, 1000 * 2);
}

function addTask(e) {
  e.preventDefault();
  if (titleInput.value == "") {
    return;
  }
  const tasksFilter = tasks.filter((task) => {
    return task.title === titleInput.value;
  });
  if (!tasksFilter.length)   {
    let id = tasks.length;
    tasks.push({
      id: id,
      title: titleInput.value,
      description: descriptionInput.value,
    });
    createTask(id, titleInput.value, descriptionInput.value);
    titleInput.value = "";
    descriptionInput.value = "";
  } else {
    eroorMessage("Title must be unique!");
  }
}

submitButton.addEventListener("click", addTask);

taskLists.forEach((taskList) => {
  taskList.addEventListener("dragover", dragOver);
  taskList.addEventListener("drop", drop);
});

function createTask(id, title, description) {
  const taskCard = document.createElement("div");
  const taskHeader = document.createElement("div");
  const taskTitle = document.createElement("p");
  const taskDescriptionContainer = document.createElement("div");
  const taskDescription = document.createElement("p");
  const deleteIcon = document.createElement("p");

  taskCard.classList.add("task-container");
  taskHeader.classList.add("task-header");
  taskDescriptionContainer.classList.add("task-description-container");

  taskTitle.textContent = title;
  taskDescription.textContent = description;
  deleteIcon.textContent = "🅇";

  taskCard.setAttribute("draggable", true);
  taskCard.setAttribute("task-id", id);

  taskCard.addEventListener("dragstart", dragStart);
  deleteIcon.addEventListener("click", deleteTask);

  taskHeader.append(taskTitle, deleteIcon);
  taskDescriptionContainer.append(taskDescription);
  taskCard.append(taskHeader, taskDescriptionContainer);
  baclogTasks.append(taskCard);
}
function deleteTask() {
  const newTask = tasks.filter((task) => {
    return task.title === this.parentNode.firstChild.textContent;
  });
  tasks = tasks.filter((task) => {
    return task !== newTask[0];
  });
  this.parentNode.parentNode.remove();
}

function addColor(column) {
  let color;
  switch (column) {
    case "backlog":
      color = "rgb(96,96,192)";
      break;
    case "doing":
      color = "rgb(83,156,174)";
      break;
    case "done":
      color = "rgb(224,165,116)";
      break;
    case "discard":
      color = "rgb(222,208,130)";
      break;
    default:
      color = "rgb(232,232,232)";
      break;
  }
  return color;
}

function addTasks() {
  tasks.forEach((task) => createTask(task.id, task.title, task.description));
}
addTasks();

let elementDragged;
function dragStart() {
  elementDragged = this;
}
function dragOver(e) {
  e.preventDefault();
}
function drop() {
  columnId = this.parentNode.id;
  this.append(elementDragged);
  elementDragged.firstChild.style.backgroundColor = addColor(columnId);
}
