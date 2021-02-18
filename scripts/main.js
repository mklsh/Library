let myLibrary = [];

function Book(title, author, totalPages) {
    this.title = title;
    this.author = author;
    this.totalPages = totalPages;

}

const generateId = (book) => {
    if (myLibrary.length === 0) {
        book.id = 0;
        return 0;
    }
    return book.id = Math.max(...myLibrary.map(b => b.id)) + 1;
}

const addBook = (book) => {
    generateId(book);
    myLibrary.push(book);
}

const loadData = () => {
    const bookList = document.querySelector(`#books-list`);

    myLibrary.map(b => convertBookObjectToHtml(b))
        .forEach(b => {
            bookList.append(b)
        });

}

const convertBookObjectToHtml = (book) => {
    let bookHtml = document.createElement('div');
    bookHtml.className = "card bg-secondary border border-1 border-white me-2 mb-2 book";
    bookHtml.id = book.id;
    bookHtml.style.width = `18em`;
    bookHtml.innerHTML = `
           <div class="card-body d-flex">
                <h5 class="card-title text-light">${book.title}</h5>
                <button type="button" class="delete-btn btn btn-danger btn-sm ms-auto" ><?xml version="1.0" encoding="UTF-8"?>
                    X
                </button>
            </div>

            <ul class="list-group list-group-flush">
                <li class="list-group-item list-group-item-dark">Author:${book.author}</li>
                <li class="list-group-item list-group-item-dark">Total Pages:${book.totalPages}</li>
                
            </ul>

            <div class="card-body d-flex">
                <button type="button" class="done-btn btn btn-success ms-auto me-auto text-light">Done</button>
            </div>`
    return bookHtml;
}

const handleAddBookForm = () => {
    let addButton = document.querySelector(`#add-book-btn`);

    addButton.addEventListener(`click`, () => {
        const newBook = convertFormInputToBookObject();
        addBook(newBook);
        const bookHtmlElement = convertBookObjectToHtml(newBook);
        appendBookHTML(bookHtmlElement);
        delegateEvents(bookHtmlElement);
        resetFormInput();

    })
}

const appendBookHTML = (bookHtmlElement) => {
    const bookList = document.querySelector(`#books-list`);
    bookList.append(bookHtmlElement);
}

const convertFormInputToBookObject = () => {
    let titleInput = document.querySelector(`#title-input`);
    let authorInput = document.querySelector(`#author-input`);
    let totalPagesInput = document.querySelector(`#total-page-input`);

    return new Book(titleInput.value, authorInput.value, totalPagesInput.value);


}

const resetFormInput = () => {
    let titleInput = document.querySelector(`#title-input`);
    let authorInput = document.querySelector(`#author-input`);
    let totalPagesInput = document.querySelector(`#total-page-input`);
    titleInput.value = '';
    authorInput.value = '';
    totalPagesInput.value = '';
}

const delegateEvents =(bookHtmlElement)=>{
    bookHtmlElement.addEventListener('click',event=>{
        let classes = event.target.className;
        switch (true){
            case classes.includes(`delete-btn`):
                deleteBook(bookHtmlElement.id);
                break;
            case classes.includes(`done-btn`):
                markAsDone(bookHtmlElement.id);
                break;
            default:
                return;

        }
    })
}

const deleteBook =(id)=>{
    let book = document.getElementById(id);
    book.remove();
    myLibrary = myLibrary.map(b => b.id!==id);
}

const markAsDone =(id)=>{
    let book= document.getElementById(id);
    book.className ="card bg-success border border-1 border-white me-2 mb-2 book";
}


function initialize() {
    loadData();
    handleAddBookForm();
}

initialize();




