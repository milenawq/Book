class Book {
    constructor(title, author, year, genre) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.genre = genre;
    }
}

const library = new Map();

function addBook(isbn, book) {
    library.set(isbn, book);
}

function mapToArray() {
    return Array.from(library, ([isbn, book]) => ({
        isbn: isbn,
        ...book
    }));
}

function filterBooks(books) {
    return books.filter(book => book.year > 2000);
}

function serialize() {
    const books = mapToArray();
    const filteredBooks = filterBooks(books);

    return JSON.stringify(filteredBooks);
}

function loadLibrary(json) {
    return JSON.parse(json);
}

function restoreMap(books) {
    return new Map(
        books.map(book => [
            book.isbn,
            new Book(book.title, book.author, book.year, book.genre)
        ])
    );
}

function findBook(library, isbn) {
    return library.get(isbn);
} 


addBook("ISBN001", new Book("Кобзар", "Тарас Шевченко", 1840, "Поезія"));
addBook("ISBN002", new Book("Гаррі Поттер", "Дж. Роулінг", 2001, "Фентезі"));
addBook("ISBN003", new Book("1984", "Джордж Орвелл", 1949, "Антиутопія"));
addBook("ISBN004", new Book("Атлант розправив плечі", "Айн Ренд", 2010, "Роман"));


const booksArray = mapToArray();
console.log("Масив:", booksArray);

const json = serialize();
console.log("JSON:", json);

const loadedBooks = loadLibrary(json);
console.log("Завантажені книги:", loadedBooks);

const restoredLibrary = restoreMap(loadedBooks);
console.log("Відновлена Map:", restoredLibrary);

const foundBook = findBook(restoredLibrary, "ISBN002");
console.log("Знайдена книга:", foundBook);

