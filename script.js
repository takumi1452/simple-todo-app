const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-btn");
const todoArea = document.getElementById("todo-area");

function createTodoItem(text) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  const todoCheckbox = document.createElement("input");
  todoCheckbox.type = "checkbox";
  todoCheckbox.classList.add("complete-checkbox");
  todoItem.appendChild(todoCheckbox);

  const todoText = document.createElement("span");
  todoText.textContent = text;
  todoText.classList.add("todo-text");
  todoItem.appendChild(todoText);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";
  deleteButton.classList.add("delete-btn");
  todoItem.appendChild(deleteButton);

  todoArea.appendChild(todoItem);
}

addButton.addEventListener("click", () => {
  if (textInput.value === "") return;

  createTodoItem(textInput.value);

  textInput.value = "";
  textInput.focus();
});

todoArea.addEventListener("click", (event) => {
  // 削除ボタンが押された場合
  if (event.target.classList.contains("delete-btn")) {
    const clickedTodoItem = event.target.closest(".todo-item");
    clickedTodoItem.remove();
  }

  // チェックボックスが押された場合
  if (event.target.type == "checkbox") {
    const isChecked = event.target.checked;
    const clickedTodoItem = event.target.closest(".todo-item");
    const clickedTodoText = clickedTodoItem.querySelector(".todo-text");

    if (isChecked) {
      clickedTodoText.classList.add("completed");
    } else {
      clickedTodoText.classList.remove("completed");
    }
  }
});
