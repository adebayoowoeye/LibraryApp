/**
 * When coding always remember that all errors depends on the dependencies of certain functions or variables.
 * This could be wrong use of classnames and functions.
 * Improper formatting if an id or class property is being referenced.
 * 
 * The window.location.reload() method is a powerful tool in web development. It is used to reload the current page.
Purpose:
The reload() method of the Location interface serves a similar function as clicking the Refresh button in your browser.
It reloads the current URL, effectively refreshing the page.
 */
const myLibrary = [];

if (localStorage.library) {
  const storage = JSON.parse(localStorage.library);
  storage.forEach((book) => {
    myLibrary.push(book);
  });
}

const bookShelf = document.querySelector('.book-shelf');

console.log(bookShelf);

const addBook = document.querySelector('.add-book');

const newBookButton = document.getElementById('new-book-btn');

newBookButton.onclick = () => {
  addBook.classList.toggle('show');
};

// Submit button

const submitBook = document.querySelector('.submit-form');

// Book Details input fields

const title = document.getElementById('add-title');
const author = document.getElementById('add-author');
const pages = document.getElementById('add-pages');
const checkbox = document.getElementById('have-read');

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
}

function checkIfReadStatus(checked) {
  if (checked) {
    return 'Already Read';
  }
  return 'Not Read';
}

let book = {
  title: 'cocumber',
  author: 'Ade',
  pages: 1,
  read: 'Already Read',
};

let lib = [
  {
    title: 'cocumber',
    author: 'Ade',
    pages: 1,
    read: 'Already Read',
  },
  {
    title: 'Ave',
    author: 'Abe',
    pages: 1,
    read: 'Already Read',
  },
];

localStorage.setItem('book', JSON.stringify(lib));

let pos = lib[0].title;

console.log(pos);

function arrangeBookOnShelf(position) {
  const bookToShelf = document.createElement('li');
  // where to place the book on the shelf, take advantage of the children property of ul which is an array of all the children of the ul element
  bookToShelf.index = position;
  bookToShelf.innerText = ${myLibrary[position].title} by ${myLibrary[position].author} - ${myLibrary[position].pages} pages;

  // Book/Edit/Delete/checkbox

  // Edit the book
  // Delete the book
  addDeleteButton(bookToShelf);
  // Add Read Button
  addReadButton(bookToShelf, position);

  bookShelf.appendChild(bookToShelf);
}

// Add Book to library

function addBookToLibrary(title, author, pages, checkbox) {
  // check to see if book is already read
  const readStatus = checkIfReadStatus(checkbox.checked);

  // Add new book
  // We get the title.value and author.value from the input fields line 21-24
  const newBook = new Book(title.value, author.value, pages.value, readStatus);

  console.log(newBook);
  newBook.index = myLibrary.length;
  myLibrary.push(newBook);

  // persist book in localStorage
  localStorage.library = JSON.stringify(myLibrary);

  arrangeBookOnShelf(myLibrary.length - 1);
  title.value = '';
  author.value = '';
  pages.value = '';
  checkbox.checked = false;
}

// Delete book

function addDeleteButton(bookToShelf) {
  const deleteBookBtn = document.createElement('span');
  deleteBookBtn.innerText = '- Delete Book -';
  deleteBookBtn.onclick = () => {
    localStorage.clear();
    myLibrary.splice(bookToShelf.index, 1);
    bookShelf.removeChild(bookToShelf);
    localStorage.library = JSON.stringify(myLibrary);
    window.location.reload(); // Refresh Book Book
  };
  bookToShelf.appendChild(deleteBookBtn);
}

// Add read button
function addReadButton(bookToShelf, position) {
  const readBox = document.createElement('input');
  readBox.type = 'checkbox';
  const readBook = document.createElement('span');
  readBook.innerText = myLibrary[position].read;
  if (readBook.innerText === 'Already Read') {
    readBook.classList.add('text-green');
    readBox.checked = true;
  } else {
    readBook.classList.add('text-red');
    readBox.checked = false;
  }
  // Listen to change event in the checkbox
  readBox.onchange = () => {
    if (readBox.checked === true) {
      readBook.innerText = 'Already Read';
      readBook.classList.add('text-green');
      readBook.classList.remove('text-red');
    } else {
      readBook.innerText = 'Not Read';
      readBook.classList.add('text-red');
      readBook.classList.remove('text-green');
    }
  };
  bookToShelf.appendChild(readBox);
  bookToShelf.appendChild(readBook);
}

function validateInputFields(input) {
  if (input.value.trim() === '') {
    input.focus();
    showFlashMessage('Please fill in all fields', 'danger');

    return false;
  }
  return true;
}

function validateInput() {
  return [title, author, pages].every(validateInputFields);
}

// Flash messages are used to display a message to the user. They are often used to display error messages, success messages, or general information. Flash messages are typically displayed at the top of the page and disappear after a few seconds.

function showFlashMessage(message, className) {
  const section = document.createElement('section');
  section.className = alert alert-${className};
  section.appendChild(document.createTextNode(message));
  const wrapper = document.querySelector('.main-wrapper');
  const header = document.querySelector('.header');
  wrapper.insertBefore(section, header);

  // Vanish the flash message after 5 seconds
  setTimeout(() => {
    document.querySelector('.alert').remove();
  }, 5000);
}

function placeBooksOnShelf() {
  for (let i = 0; i <= myLibrary.length - 1; i += 1) {
    arrangeBookOnShelf(i);
  }

  submitBook.onclick = () => {
    if (validateInput() === true) {
      addBookToLibrary(title, author, pages, checkbox);
      showFlashMessage('Book added successfully', 'success');
    }
  };
}

placeBooksOnShelf();