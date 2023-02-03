const bookNameField = document.querySelector("#book-name-field");
const authorNameField = document.querySelector("#author-name-field");
const pagesField = document.querySelector("#pages-field");
const readitCheckbox = document.querySelector("#readit");
const createNewBookBtn = document.querySelector("#create-book-btn");
const openModalBtn = document.querySelector("[data-modal-target]");
const closeModalBtn = document.querySelector("[data-close-button]");
const overlay = document.querySelector("#overlay");
const tbodyEl = document.querySelector("#tbodyEl");
const errorMsgContainer = document.querySelector("#error-msg-container");

openModalBtn.addEventListener("click", () => {
  const modal = document.querySelector(openModalBtn.dataset.modalTarget);
  openModal(modal);
});

closeModalBtn.addEventListener("click", () => {
  const modal = closeModalBtn.closest(".modal");
  closeModal(modal);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(openModalBtn.dataset.modalTarget);
  closeModal(modal);
});

function openModal(modal) {
  if (modal === null) {
    return;
  } else {
    modal.classList.add("active");
    overlay.classList.add("active");
  }
}

function closeModal(modal) {
  if (modal === null) {
    return;
  } else {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
}

createNewBookBtn.disabled = true;

function validateForm() {
  let result = false;
  if (!bookNameField.value || !authorNameField.value) {
    errorMsgContainer.innerText = "*You must enter a title and an author.";
    createNewBookBtn.disabled = true;
  }
  if (bookNameField.value && authorNameField.value) {
    errorMsgContainer.innerText = "";
    createNewBookBtn.disabled = false;
    result = true;
  }
  return result;
}

authorNameField.addEventListener("blur", validateForm);
let library = [];
let libraryContainer;

function Book(title, author, pages, readit) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readit = readit;
  this.determineStatus = function () {
    let status = "not read yet";
    if (this.readit) {
      status = "read already";
    }
    return status;
  };
  this.toggleReaditBtnStatus = function () {
    if (this.readit === true) {
      this.readit = false;
    } else if (this.readit === false) {
      this.readit = true;
    }
  };
}

createNewBookBtn.addEventListener("click", (e) => {
  let title = bookNameField.value;
  let author = authorNameField.value;
  let pages = pagesField.value;
  let readit = readitCheckbox.checked;
  // console.log(readit);
  e.preventDefault();

  addBookToLibrary(title, author, pages, readit);
  createBookEntry();
  console.log(library);
  closeModal(modal);
});

function addBookToLibrary(title, author, pages, readit) {
  // console.log(readit);
  const newBook = new Book(title, author, pages, readit);
  library.push(newBook);
}

function createBookEntry() {
  const checkForm = validateForm();
  console.log(checkForm);
  if (!checkForm) {
    return;
  } else {
    let index = 0;
    const bookRows = tbodyEl.querySelectorAll("tr");
    for (const bookRow of bookRows) {
      tbodyEl.removeChild(bookRow);
    }
    for (const book of library) {
      const bookRow = document.createElement("tr");
      bookRow.setAttribute("id", library.indexOf(book));
      tbodyEl.appendChild(bookRow);

      const numberTD = document.createElement("td");
      bookRow.append(numberTD);
      numberTD.innerText = library.indexOf(book) + 1;

      const titleTD = document.createElement("td");
      bookRow.append(titleTD);
      titleTD.innerText = book.title;

      const authorTD = document.createElement("td");
      bookRow.append(authorTD);
      authorTD.innerText = book.author;

      const pagesTD = document.createElement("td");
      bookRow.append(pagesTD);
      pagesTD.innerText = book.pages;

      const readitTD = document.createElement("td");
      bookRow.append(readitTD);
      const readitBtn = document.createElement("button");
      readitTD.append(readitBtn);
      readitBtn.setAttribute("class", "readit-btn");
      readitBtn.innerText = book.determineStatus();
      readitBtn.addEventListener("click", function () {
        book.toggleReaditBtnStatus();
        createBookEntry();
      });

      const deleteBtnTD = document.createElement("td");
      bookRow.append(deleteBtnTD);
      const deleteBtn = document.createElement("button");
      deleteBtnTD.append(deleteBtn);
      deleteBtn.setAttribute("class", "delete-btn");
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", function () {
        bookRow.remove();
        const bookIndex = library.indexOf(book);
        library.splice(bookIndex, 1);
        createBookEntry();
      });
      index++;
    }
  }
}

console.log(library);
