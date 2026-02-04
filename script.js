const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-btn");
const todoArea = document.getElementById("todo-area");

addButton.addEventListener("click", () => {
  if (textInput.value === "") return;

  console.log(textInput.value);

  const todoItem = document.createElement("div");
  todoItem.textContent = textInput.value;
  todoArea.appendChild(todoItem);

  textInput.value = "";
  textInput.focus();
});
