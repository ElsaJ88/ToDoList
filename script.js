import {
  getData,
  postToDoItem,
  changeToDoItem,
  checkToDoItem,
  unCheckToDoItem,
  deleteToDoItem,
} from "./api-client.js";

//Selectors

const addTaskButton = document.querySelector(".addtaskbtn");
const inputTask = document.querySelector(".inputtask");
const listContainer = document.querySelector("#todolist");

// Empty and add to dom
const emptyDOM = function () {
  while (listContainer.firstChild) {
    listContainer.removeChild(listContainer.firstChild);
  }
};

const addItemsToDOM = async function () {
  emptyDOM();
  const data = await getData();
  data.forEach((item) => {
    //Create section-item
    const section = document.createElement("section");
    section.classList.add("todolist-item");
    //Create checkbox
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    checkbox.setAttribute("name", `${item._id}`);
    //Create label
    const labelCheckbox = document.createElement("label");
    labelCheckbox.setAttribute("for", `${item._id}`);
    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "fa-solid fa-trash-can");
    deleteButton.setAttribute("id", `${item._id}`);
    // Create text/input
    const textField = document.createElement("input");
    textField.setAttribute("type", "text");
    textField.setAttribute("id", `${item._id}`);
    textField.classList.add("change-input");
    textField.setAttribute("value", `${item.description}`);
    textField.setAttribute("readonly", "");
    textField.setAttribute("maxlength", "40");
    // Add to 'done' items
    if (item.done === true) {
      textField.classList.add("done");
      checkbox.classList.add("done");
      checkbox.checked = true;
    }
    // Add elements togheter
    const completeToDoList = listContainer.appendChild(section);
    completeToDoList.appendChild(checkbox);
    completeToDoList.appendChild(labelCheckbox).appendChild(textField);
    completeToDoList.appendChild(deleteButton);
  });
};

// Event Listeners

const addToDo = function () {
  inputTask.addEventListener("change", postToDoItem);
};

addTaskButton.addEventListener("click", addToDo());

const clickedOnText = function (e) {
  const item = e.target;
  item.removeAttribute("readonly");
  item.addEventListener("change", async function () {
    const text = e.target.value;
    const id = e.target.id;
    changeToDoItem(text, id);
  });
};

document.body.addEventListener("mousedown", function (e) {
  if (
    e.target.classList.value == "change-input" ||
    e.target.classList.value == "change-input done"
  ) {
    clickedOnText(e);
  } else if (e.target.classList.value == "checkbox done") {
    unCheckToDoItem(e.target.name);
    addItemsToDOM();
  } else if (e.target.classList.value == "checkbox") {
    checkToDoItem(e.target.name);
    addItemsToDOM();
  } else if (e.target && e.target.classList.value == "fa-solid fa-trash-can") {
    deleteToDoItem(e.target.id);
    addItemsToDOM();
  }
});

addItemsToDOM();
