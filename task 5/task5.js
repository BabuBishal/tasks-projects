const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const userList = document.getElementById("userDetails");

let users = JSON.parse(localStorage.getItem("users")) || [];
let editUserId = null;
users.forEach(showUser);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const user = {
    id: editUserId || Date.now(),
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
  };

  if (editUserId) {
    users = users.map((u) => (u.id === editUserId ? user : u));
    editUserId = null;
    form.querySelector("button").textContent = "Add";
    userList.innerHTML = "";
    users.forEach(showUser);
    localStorage.setItem("users", JSON.stringify(users));
  } else {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    showUser(user);
  }

  // users.push(user);
  // showUser(user);

  form.reset();
});

function showUser(user) {
  const div = document.createElement("div");
  div.classList.add("user-item");
  div.dataset.id = user.id;

  const li = document.createElement("li");
  li.textContent = `${user.name} | ${user.email} | ${user.phone}`;
  const editSpan = document.createElement("span");
  editSpan.classList.add("edit");
  editSpan.textContent = "Edit";
  editSpan.addEventListener("click", () => editUser(user.id));

  const deleteSpan = document.createElement("span");
  deleteSpan.classList.add("delete");
  deleteSpan.textContent = "Delete";
  deleteSpan.addEventListener("click", () => deleteUser(user.id));

  div.appendChild(li);
  div.appendChild(editSpan);
  div.appendChild(deleteSpan);
  userList.appendChild(div);
}

function editUser(id) {
  const user = users.find((user) => user.id === id);

  if (!user) return;

  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  editUserId = id;

  form.querySelector("button").textContent = "Update";
}

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  document.querySelector(`div[data-id='${id}']`).remove();
}
