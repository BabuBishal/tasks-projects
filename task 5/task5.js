const main = document.getElementById("main");
const form = document.getElementById("form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const userList = document.getElementById("userDetails");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");

// fetching users from localstorage if present otherwise initializing with empty array
let users = JSON.parse(localStorage.getItem("users")) || [];
let editUserId = null;
// console.log(users);
users.forEach(showUser);

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  let isFormValid = true;

  // setting initial error message to empty string
  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";

  isFormValid = validateUser(name) && isFormValid;
  isFormValid = validateEmail(email, editUserId) && isFormValid;
  isFormValid = validatePhone(phone, editUserId) && isFormValid;

  if (!isFormValid) return;

  const user = {
    id: editUserId || Date.now(),
    name,
    email,
    phone,
  };

  if (editUserId) {
    // replacing the previous user with edituserid with new updated user data
    users = users.map((u) => (u.id === editUserId ? user : u));

    // clearing edituserid

    editUserId = null;
    form.querySelector("button").textContent = "Add";

    //clearing list so that it can rerender with new updated data
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
  const tr = document.createElement("tr");
  tr.classList.add("user-item");

  tr.dataset.id = user.id;

  //adding table row along with its corresponding user data
  tr.innerHTML = `
  <td data-label="Name">${user.name}</td>
  <td data-label="Email">${user.email}</td>
  <td data-label="Phone">${user.phone}</td>
  <td data-label="Edit"><button class="edit" onclick="editUser(${user.id})">Edit</button> </td>
  <td data-label="Delete"> <button class="delete" onclick="openModal(${user.id})">Delete</button>
  </td>`;

  tr.classList.add("adding");
  // const li = document.createElement("li");
  // li.textContent = `${user.name} | ${user.email} | ${user.phone}`;
  // const editSpan = document.createElement("span");
  // editSpan.classList.add("edit");
  // editSpan.textContent = "Edit";
  // editSpan.addEventListener("click", () => editUser(user.id));

  // const deleteSpan = document.createElement("span");
  // deleteSpan.classList.add("delete");
  // deleteSpan.textContent = "Delete";
  // deleteSpan.addEventListener("click", () => deleteUser(user.id));

  // div.appendChild(li);
  // div.appendChild(editSpan);
  // div.appendChild(deleteSpan);
  userList.appendChild(tr);
  void tr.offsetWidth;
  tr.classList.add("show");
  // requestAnimationFrame(() => {});
}

function editUser(id) {
  const user = users.find((user) => user.id === id);

  if (!user) return;

  // repopulate the form for editing

  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;

  // set edituserid with user id to flag which user to edit
  editUserId = id;

  // change button text when editing
  form.querySelector("button").textContent = "Update";
}

function openModal(id) {
  const modal = document.createElement("div");
  modal.id = "modal";
  modal.innerHTML = `<div class="modal-box">
          <div class="content" id="content">Are you sure you want to delete this user?</div>
         <div class="actions"> <button   class="yes">Yes</button>
          <button  class="no" >No</button></div>
        </div>`;
  main.appendChild(modal);

  modal.querySelector(".yes").addEventListener("click", () => {
    deleteUser(id);
    closeModal();
  });

  modal.querySelector(".no").addEventListener("click", () => {
    closeModal();
  });
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) {
    modal.remove();
  }
}

function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  localStorage.setItem("users", JSON.stringify(users));
  const removedItem = document.querySelector(`tr[data-id='${id}']`);
  closeModal();
  removedItem.classList.add("removing");
  // removedItem.classList.add("hide");

  // Wait for animation to finish before removing
  // removedItem.addEventListener("transitionend", () => {
  //   removedItem.remove(), { once: true };
  // });
  requestAnimationFrame(() => {
    removedItem.classList.add("hide");
  });
  // removedItem.remove();
  // Remove row after animation completes
  removedItem.addEventListener("transitionend", () => {
    removedItem.remove();
  });
}

function cancelDeleteUser() {}

// validation for user name - at least three characters

function validateUser(name) {
  if (name.length < 2) {
    nameError.textContent = "Please enter at least 3 characters.";
    isFormValid = false;
    nameInput.focus();
    nameInput.style.border = "1px solid #d40047";
    nameInput.style.boxShadow =
      "0 0 0 2px #fff, 0 0 0 5px rgba(212, 0, 71, 0.5)";
    return false;
  }
  nameInput.style.border = "";
  nameInput.style.boxShadow = "";
  return true;
}

// validation function  for email
function validateEmail(email, editId) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(email)) {
    emailError.textContent = "Please enter valid email address.";
    emailInput.style.border = "1px solid #d40047";
    emailInput.style.boxShadow =
      "0 0 0 2px #fff, 0 0 0 5px rgba(212, 0, 71, 0.5)";
    emailInput.focus();
    return false;
  }
  if (isEmailDuplicate(email, editId)) {
    emailError.textContent =
      "This email already exists. Please try another email.";
    emailInput.style.border = "1px solid #d40047";
    emailInput.style.boxShadow =
      "0 0 0 2px #fff, 0 0 0 5px rgba(212, 0, 71, 0.5)";
    emailInput.focus();

    return false;
  }
  emailInput.style.border = "";
  emailInput.style.boxShadow = "";
  return true;
}

function validatePhone(phone, editId) {
  const phonePattern = /^\d{10}$/;
  // validation for phone - exactly 10 digits required
  if (!phonePattern.test(phone)) {
    phoneError.textContent = "Please enter 10 digit phone number.";
    phoneInput.focus();
    phoneInput.style.border = "1px solid #d40047";
    phoneInput.style.boxShadow =
      "0 0 0 2px #fff, 0 0 0 5px rgba(212, 0, 71, 0.5)";
    return false;
  }
  if (isPhoneDuplicate(phone, editId)) {
    phoneError.textContent =
      "This phone number already exists. Please try another.";
    phoneInput.focus();
    phoneInput.style.border = "1px solid #d40047";
    phoneInput.style.boxShadow =
      "0 0 0 2px #fff, 0 0 0 5px rgba(212, 0, 71, 0.5)";
    return false;
  }
  phoneInput.style.border = "";
  phoneInput.style.boxShadow = "";
  return true;
}

//check for duplicate phone
function isPhoneDuplicate(phone, editUserId = null) {
  return users.some((user) => user.phone === phone && user.id !== editUserId);
}

//check for duplicate email
function isEmailDuplicate(email, editUserId = null) {
  return users.some((user) => user.email === email && user.id !== editUserId);
}
