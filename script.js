const textInput = document.getElementById("text-input");
const addButton = document.getElementById("add-btn");
const todoArea = document.getElementById("todo-area");
let todos = [];

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

// 追加処理関数
function addTodo(text) {
  // todosにinputされたテキストとToDo未完了の情報を追加
  todos.push({
    text: text,
    completed: false,
  });

  saveTodos();
  renderTodos();
}

// 入力欄から追加する関数
function addTodoFromInput(textInput) {
  const text = textInput.value.trim();
  if (text === "") return;

  addTodo(text);

  textInput.value = "";
  textInput.focus();
}

function renderTodos() {
  // 表示エリアの初期化処理
  todoArea.innerHTML = "";

  todos.forEach((todo, index) => {
    // todosを１行ずつ読み取る
    const text = todo.text;
    const completed = todo.completed;
    // console.log(`text:${text}, completed:${completed}, index:${index}`);

    // 1行DOMの作成→todoAreaに表示
    todoArea.append(createTodoItem(text, completed, index));
  });
}

// localStorageに保存
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// localStrageに保存してあるtodosを復元
const savedTodos = localStorage.getItem("todos");

// localStrageにundefinedが入って、エラーを起こすのを防ぐ処理
// "undefined"という文字列ではなく、かつ値が存在する場合のみ実行
if (savedTodos && savedTodos !== "undefined") {
  try {
    todos = JSON.parse(savedTodos);
    renderTodos();
  } catch (e) {
    // もしJSONが壊れていたら、空の配列でリセットする処理
    console.error("データの読み込みに失敗しました", e);
    todos = [];
    localStorage.removeItem("todos");
  }
}

// Enterキーが押された場合
textInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    addTodoFromInput(textInput);
  }
});

// 追加ボタンが押された場合
addButton.addEventListener("click", () => {
  addTodoFromInput(textInput);
});

todoArea.addEventListener("click", (event) => {
  // 削除ボタンが押された場合
  if (event.target.classList.contains("delete-btn")) {
    const clickedTodoItem = event.target.closest(".todo-item");
    const index = Number(clickedTodoItem.dataset.index);

    todos.splice(index, 1);

    saveTodos();
    renderTodos();
  }

  // チェックボックスが押された場合
  if (event.target.type == "checkbox") {
    const clickedTodoItem = event.target.closest(".todo-item");
    const index = Number(clickedTodoItem.dataset.index);

    todos[index].completed = event.target.checked;

    saveTodos();
    renderTodos();
  }
});
