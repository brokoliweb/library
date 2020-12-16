let bookCollection = [];

newCollection = [];

const table = document.getElementById("book-table");
const bookForm = document.getElementById("book-form");
const openBtn = document.getElementById("open-button");
const submitBtn = document.getElementById("submit-btn");
const cancelBtn = document.getElementById("cancel-btn");
const authorName = document.getElementById("author");
const titleName = document.getElementById("title");
const status = document.getElementById("status");
const bookList = document.getElementById("book-list");





openBtn.addEventListener("click", openForm);

cancelBtn.addEventListener("click", closeForm);

submitBtn.addEventListener("click", addBook);

bookList.addEventListener("click", sortList);

// openForm

function openForm() {
  bookForm.style.display = "block";
}

function closeForm() {
  bookForm.style.display = "none";
}

// add new book to the table

function addBook() {
  bookCollection.push({
    title: titleName.value,
    author: authorName.value,
    read: status.value,
  });

  addRow(bookCollection.length - 1);
}

// create new table row
function addRow(num) {
  let newRow = document.createElement("tr");
  table.appendChild(newRow);
  let newColumn01 = document.createElement("td");
  newColumn01.setAttribute("id", "author-name" + num);
  let newColumn02 = document.createElement("td");
  newColumn02.setAttribute("id", "book-title" + num);
  let newColumn03 = document.createElement("td");
  newColumn03.setAttribute("id", "read-status" + num);

  let newColumn04 = document.createElement("td");
  newColumn04.setAttribute("class", "crs-btn");
  newColumn04.textContent = "Change";

  let newColumn05 = document.createElement("td");
  newColumn05.textContent = "X";
  newColumn05.setAttribute("class", "delete-btn");

  newRow.appendChild(newColumn01);
  newRow.appendChild(newColumn02);
  newRow.appendChild(newColumn03);
  newRow.appendChild(newColumn04);
  newRow.appendChild(newColumn05);

  addToList();
}

// add to list
function addToList() {
  for (let i = 0; i < bookCollection.length; i++) {
    document.getElementById("author-name" + i).textContent =
      bookCollection[i].author;
    document.getElementById("book-title" + i).textContent =
      bookCollection[i].title;
    document.getElementById("read-status" + i).textContent =
      bookCollection[i].read;
  }

  listenCRS();
  listenDelete();
  libraryCount();
  storeLocal();
}

// sort book list

function sortList() {
  if (bookList.value === "alph-author") {
    bookCollection.sort(function sortList(a, b) {
      let textA = a.author.toUpperCase();
      let textB = b.author.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  } else {
    bookCollection.sort(function sortList(a, b) {
      let textA = a.title.toUpperCase();
      let textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  }

  addToList();
}

// Library Count

let read = 0;
let notRead = 0;

function libraryCount(a) {
  read = 0;
  notRead = 0;

  bookCollection.map((a) => {
    if (a.read === "🔵") {
      read++;
    } else {
      notRead++;
    }
    
  });

  document.getElementById(
    "total-books"
  ).textContent = `Total: ${bookCollection.length}`;
  document.getElementById("read-books").textContent = `Read: ${read}`;
  document.getElementById(
    "not-read-books"
  ).textContent = `Not Read: ${notRead}`;
}

// event listener for CRS
function listenCRS() {
  let changed = document.querySelectorAll(".crs-btn");
  for (let i = 0; i < changed.length; i++) {
    changed[i].addEventListener("click", changeReadStatus);
  }
}

// event listener for delete
function listenDelete() {
  let removed = document.querySelectorAll(".delete-btn");
  for (let i = 0; i < removed.length; i++) {
    removed[i].addEventListener("click", deleteBook);
  }
}

function changeReadStatus(e) {

  let x = e.target.previousSibling.previousSibling;
  let str = x.id;
  let num = str[str.length - 1];

  let z = e.target.previousSibling;

  if (bookCollection[num].read === "🔵") {
    bookCollection[num].read = "⚪";
    z.textContent = "⚪";
  } else {
    bookCollection[num].read = "🔵";
    z.textContent = "🔵";
  }
  libraryCount();
}

function deleteBook(e) {
  let x = e.target.previousSibling.previousSibling;
  let str = x.id;
  let num = str[str.length - 1];
  
  for (let i = 1; i < bookCollection.length + 1; i++) {
    table.deleteRow(1);
  }

  newCollection = bookCollection.splice(num, 1);
  
  makeNewTable();
}

function makeNewTable() {
  for (let i = 0; i < bookCollection.length; i++) {
    let newRow = document.createElement("tr");
    table.appendChild(newRow);
    let newColumn01 = document.createElement("td");
    newColumn01.setAttribute("id", "author-name" + i);
    let newColumn02 = document.createElement("td");
    newColumn02.setAttribute("id", "book-title" + i);
    let newColumn03 = document.createElement("td");
    newColumn03.setAttribute("id", "read-status" + i);

    let newColumn04 = document.createElement("td");
    newColumn04.setAttribute("class", "crs-btn");
    newColumn04.textContent = "Change";

    let newColumn05 = document.createElement("td");
    newColumn05.textContent = "X";
    newColumn05.setAttribute("class", "delete-btn");

    newRow.appendChild(newColumn01);
    newRow.appendChild(newColumn02);
    newRow.appendChild(newColumn03);
    newRow.appendChild(newColumn04);
    newRow.appendChild(newColumn05);
  }

  addToList();
}


// store bookCollection in local storage

function storeLocal() {
  let jsonBookCollection = JSON.stringify(bookCollection);
  
  window.localStorage.setItem('bookCollection', jsonBookCollection);
  
  
  
  
}

// load from storage
  loadStorage();
function loadStorage() {
  
  let getItem = localStorage.getItem('bookCollection');
  
  let item = JSON.parse(getItem);
  if(!item) {
    return;
  } else {
    bookCollection = item;
    makeNewTable();
  }
  
  
  
}