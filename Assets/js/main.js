const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
const btn = document.querySelector(".lightMood");

const body = document.querySelector("body");
const home = document.querySelector(".container");
const cards = document.querySelectorAll(".todo");

let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = "";

// Theeem
btn.onclick = function () {
  body.classList.toggle("dark-black");
  home.classList.toggle("dark-home");

  cards.forEach((card) => card.classList.toggle("dark-card"));

  btn.classList.toggle("active");

  // التحقق مما إذا كان الثيم مظلم أو فاتح
  if (!body.classList.contains("dark-black")) {
    btn.classList.replace("btn-dark", "btn-light");
    btn.innerHTML = `<span>&#9790;</span> Dark`; // تغيير النص
  } else {
    btn.classList.replace("btn-light", "btn-dark");
    btn.innerHTML = `<span>&#9788;</span> Light`; // تغيير النص
  }
};

showTodos();

function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return "";
  }
  let checked = todo.status == "completed" ? "checked" : "";
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

function showTodos() {
  if (!todosHtml) return;

  if (todosJson.length === 0) {
    todosHtml.innerHTML = "";
    emptyImage.style.display = "block";
  } else {
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join("");
    emptyImage.style.display = "none";
  }
}

function addTodo(todo) {
  input.value = "";
  todosJson.unshift({ name: todo, status: "pending" });
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
}

input.addEventListener("keyup", (e) => {
  let todo = input.value.trim();
  if (!todo || e.key != "Enter") {
    return;
  }
  addTodo(todo);
});

addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  if (!todo) {
    // check
    alert("Please Enter Your task");
    return;
  }
  addTodo(todo);
});

function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
  if (todo.checked) {
    todoName.classList.add("checked");
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    todosJson[todo.id].status = "pending";
  }
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

function remove(todo) {
  const index = todo.dataset.index;
  todosJson.splice(index, 1);
  localStorage.setItem("todos", JSON.stringify(todosJson)); 
  showTodos();
}

filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains("active")) {
      el.classList.remove("active");
      filter = "";
    } else {
      filters.forEach((tag) => tag.classList.remove("active"));
      el.classList.add("active");
      filter = e.target.dataset.filter;
    }
    showTodos();
  });
});

deleteAllButton.addEventListener("click", () => {
  todosJson = [];
  localStorage.setItem("todos", JSON.stringify(todosJson));
  showTodos();
});


  // Theem
  const themeToggleBtn = document.querySelector('.lightMood');

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    
    // localStorage
    if (body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  });

  // localStorage 
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-theme');
  }

  