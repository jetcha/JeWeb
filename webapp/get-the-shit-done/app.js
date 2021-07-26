/*--------------------*/
/*---- Select DOM ----*/
/*--------------------*/
const input = document.querySelector("#input");
const submit = document.querySelector("#submit");
const list = document.querySelector(".todo-list");
const filter = document.querySelector("#filter");

console.log(filter);

/*------------------------*/
/*---- Event Listener ----*/
/*------------------------*/
document.addEventListener("DOMContentLoaded", retrieveItem);
submit.addEventListener("click", addTodo);
list.addEventListener("click", deleteTodo);
filter.addEventListener("click", filterOption);

/*-------------------*/
/*---- Functions ----*/
/*-------------------*/

// Add items to the list
function addTodo(event) {
  // Prevent refreshing after submitting
  event.preventDefault();

  // Create the div of item wrapper

  const wrapperDiv = document.createElement("div");
  wrapperDiv.classList.add("item-wrapper");

  // Create todo item
  const todoDiv = document.createElement("div");
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo-item");
  todoItem.innerText = input.value;
  todoDiv.appendChild(todoItem);
  wrapperDiv.appendChild(todoDiv);

  // Save the item to the local storage
  saveItems(input.value);

  // Create Completed Button

  const completeButton = document.createElement("button");
  completeButton.classList.add("complete-button");
  completeButton.innerHTML = `<i class="fas fa-check"></i>`;
  wrapperDiv.appendChild(completeButton);

  // Create Delete Button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
  wrapperDiv.appendChild(deleteButton);

  // Get rid of the input value
  input.value = "";

  // Add the whole div to the list
  list.appendChild(wrapperDiv);
}

// Delte todo items
function deleteTodo(event) {
  const targetItem = event.target;

  if (targetItem.classList[0] === "delete-button") {
    const wrapperDiv = targetItem.parentElement;
    wrapperDiv.classList.add("fall-down");
    removeItem(wrapperDiv);
    wrapperDiv.addEventListener("transitionend", function () {
      wrapperDiv.remove();
    });
  } else if (targetItem.classList[0] === "complete-button") {
    const wrapperDiv = targetItem.parentElement;
    wrapperDiv.classList.toggle("completed");
  }
}

// Filter todo options
function filterOption(event) {
  const todoItem = list.childNodes;
  todoItem.forEach(function (item) {
    switch (event.target.value) {
      case "all":
        if (item.classList === undefined) {
          break;
        } else {
          item.style.display = "flex";
        }
        break;
      case "done":
        if (item.classList === undefined) {
          break;
        } else if (item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "ongoing":
        if (item.classList === undefined) {
          break;
        } else if (!item.classList.contains("completed")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      default:
        break;
    }
  });
}

// Save items to the local storage
function saveItems(item) {
  let todoList;
  console.log(item);
  // Check if the local storage is empty or not
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  todoList.push(item);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Retrieve the items from the local storage
function retrieveItem() {
  let todoList;
  // Check if the local storage is empty or not
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  // Restore all the items in the local storage
  todoList.forEach(function (item) {
    // Create the div of item wrapper
    const wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("item-wrapper");

    // Create todo item
    const todoDiv = document.createElement("div");
    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = item;
    todoDiv.appendChild(todoItem);
    wrapperDiv.appendChild(todoDiv);

    // Create Completed Button
    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-button");
    completeButton.innerHTML = `<i class="fas fa-check"></i>`;
    wrapperDiv.appendChild(completeButton);

    // Create Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
    wrapperDiv.appendChild(deleteButton);

    // Get rid of the input value
    input.value = "";

    // Add the whole div to the list
    list.appendChild(wrapperDiv);
  });
}

// Remove the items from the local storage
function removeItem(item) {
  let todoList;
  // Check if the local storage is empty or not
  if (localStorage.getItem("todoList") === null) {
    todoList = [];
  } else {
    todoList = JSON.parse(localStorage.getItem("todoList"));
  }
  itemContent = item.children[0].children[0].innerText;
  todoList.splice(todoList.indexOf(itemContent), 1);
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
