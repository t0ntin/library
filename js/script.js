const bookNameField = document.querySelector("#book-name-field");
const authorNameField = document.querySelector("#author-name-field");
const ratingField = document.querySelector("#rating-field");
const readitCheckbox = document.querySelector("#readit");
const createNewBookBtn = document.querySelector("#create-book-btn");
const libraryContainer = document.querySelector(".library-container");

let library = [];



function Book (title, author, rating, readit) {
  this.title = title;
  this.author = author;
  this.rating = rating; 
  this.readit = readit;
  // this.logInfo = function () {
  //   let status = "not read yet"
  //   if (this.readit) {
  //     status = "read already";
  //   }
  //   return (`${title}  by ${author},  ${rating} rating, ${status}`);
  // }
}

createNewBookBtn.addEventListener("click", (e) => {
  let title = bookNameField.value;
  let author = authorNameField.value;
  let rating = ratingField.value;
  let readit = readitCheckbox.checked;
  console.log(readit);
  e.preventDefault();

  addBookToLibrary(title, author, rating, readit);
  console.log(library);
});

function addBookToLibrary(title, author, rating, readit) {
  console.log(readit);
  const newBook = new Book (title, author, rating, readit);
  library.push(newBook);
  // console.log(newBook.logInfo());

}

console.log(library);

