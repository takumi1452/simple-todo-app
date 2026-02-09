const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-btn");
const todoArea = document.getElementById("todo-area");
const todos = [];

// 1行DOMの作成
function createTodoItem(text, completed, index) {
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");
  todoItem.setAttribute("data-index", index);

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

  // チェックボックスの状態の確認
  if (completed) {
    todoCheckbox.checked = true;
    todoText.classList.add("completed");
  }

  return todoItem;
}

function renderTodos() {
  // 表示エリアの初期化処理
  todoArea.innerHTML = "";

  todos.forEach((todo, index) => {
    // todosを１行ずつ読み取る
    const text = todo.text;
    const completed = todo.completed;
    console.log(`text:${text}, completed:${completed}, index:${index}`);

    // 1行DOMの作成→todoAreaに表示
    todoArea.append(createTodoItem(text, completed, index));
  });
}

addButton.addEventListener("click", () => {
  if (textInput.value === "") return;

  // todosにinputされたテキストとToDo未完了の情報を追加
  todos.push({
    text: textInput.value,
    completed: false,
  });

  renderTodos();

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
