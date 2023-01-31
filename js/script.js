const bookNameField = document.querySelector("#book-name-field");
const authorNameField = document.querySelector("#author-name-field");
const ratingField = document.querySelector("#rating-field");
const readitCheckbox = document.querySelector("#readit");
const createNewBookBtn = document.querySelector("#create-book-btn");
const openModalBtn = document.querySelector('[data-modal-target]');
const closeModalBtn = document.querySelector('[data-close-button]');
const overlay = document.querySelector("#overlay");

// const cardTitleHeading = document.createElement("h2");
// const cardTitle = document.createElement("h3");
// const cardAuthorHeading = document.createElement("h2");
// const cardAuthor = document.createElement("h3");
// const cardRatingHeading = document.createElement("h2");
// const cardRating = document.createElement("h3");
// const readitHeading = document.createElement("h3");


openModalBtn.addEventListener("click", () =>{
  const modal = document.querySelector(openModalBtn.dataset.modalTarget);
  openModal(modal);
});

closeModalBtn.addEventListener("click", () =>{
  const modal = closeModalBtn.closest('.modal');
  closeModal(modal);
});

overlay.addEventListener("click", () => {
  const modal = document.querySelector(openModalBtn.dataset.modalTarget);
  closeModal(modal);
})

function openModal(modal) {
  if(modal === null) {
    return
} else {
  modal.classList.add('active');
  overlay.classList.add('active');
}
};

function closeModal(modal) {
  if(modal === null) {
    return
} else {
  modal.classList.remove('active');
  overlay.classList.remove('active');
}
}
let library = [];
let libraryContainer;


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
  // console.log(readit);
  e.preventDefault();

  addBookToLibrary(title, author, rating, readit);
  createBookEntry();
  console.log(library);
  closeModal(modal);
});

function addBookToLibrary(title, author, rating, readit) {
  // console.log(readit);
  const newBook = new Book (title, author, rating, readit);
  library.push(newBook);
  // console.log(newBook.logInfo());

}

function createBookEntry() {
  if (!libraryContainer) {
   libraryContainer = document.createElement('div');
  document.body.append(libraryContainer);
  libraryContainer.classList.add("library-container")
  }

  library.forEach((Book, index) => {

    const existingCard = libraryContainer.querySelector(`[data-index="${index}"]`);
    console.log(existingCard);
    console.log(index);
    console.log("existingCard = "+existingCard + ", index = " + index);
    if (!existingCard) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");
    cardContainer.setAttribute("data-index", index);
    libraryContainer.append(cardContainer);
    const cardTitleHeading = document.createElement("h2");
    const cardTitle = document.createElement("h3");
    const cardAuthorHeading = document.createElement("h2");
    const cardAuthor = document.createElement("h3");
    const cardRatingHeading = document.createElement("h2");
    const cardRating = document.createElement("h3");
    const readitHeading = document.createElement("h3");
    const deleteCardBtn = document.createElement("button");



    cardContainer.append(cardTitleHeading);
    cardTitleHeading.innerText = "Title";
    cardContainer.append(cardTitle);
    cardTitle.innerText = Book.title;

    cardContainer.append(cardAuthorHeading);
    cardAuthorHeading.innerText = "Author";
    cardContainer.append(cardAuthor);
    cardAuthor.innerText = Book.author;

    cardContainer.append(cardRatingHeading);
    cardRatingHeading.innerText = "Rating";
    cardContainer.append(cardRating);
    cardRating.innerText = Book.rating;

    cardContainer.append(readitHeading);
    readitHeading.innerText = "I have read it ✓✓"

    cardContainer.append(deleteCardBtn);
    deleteCardBtn.classList.add("delete-card-btn");
    deleteCardBtn.innerText = "Delete";


    }
 

 
    
 

  })
 
}

console.log(library);
console.log();

