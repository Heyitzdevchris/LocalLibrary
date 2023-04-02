function findAuthorById(authors, id) {
  // Loop through the authors array
  for (let i = 0; i < authors.length; i++) {
    // Check whether the 'id' of the current author object matches the provided 'id'
    if (authors[i].id === id) {
      // If it does then return the author object
      return authors[i];
    }
  }
  // return null if no author is found with the id input
  return null;
}

function findBookById(books, id) {
  // return the book using the find() method and use a arrow function for cleaner/ minimal code
  return books.find(book => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Create a variable equal to an empty array for the book that are checked out
  const checkedOutBooks = [];
  // Create another variable equal to an empty array for the books that are returned
  const returnedBooks = [];
  // Iterate through the inputted array of book objects
  for (let book of books) {
    // If the 'returned' property of the first transaction object is 'false', the book is added to the checkedOutBooks
    if (book.borrows[0].returned === false) {
      checkedOutBooks.push(book);
    } // Otherwise add the book object to the returnedBooks array
    else {
      returnedBooks.push(book);
    }
  }
  // return both arrays
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  // Create a variable that is equal to an empty array for the borrowers
  const borrowers = [];
  // Iterate through the borrows array of the inputted book object
  for (let transaction of book.borrows) {
    // Using the find() method to see if a matching 'id' property with an account object in the inputted account object array
    const account = accounts.find(acc => acc.id === transaction.id);
    // If a match is found, a new object is created that combines the account object and the corresponding transaction object from the borrows array, including the return property
    if (account) {
      const borrower = {
        ...account,
        returned: transaction.returned,
      };
      // This object is added to the 'borrowers' array until there are ten objects in the array OR there are no more transactions in the borrows array
      borrowers.push(borrower);
      if (borrowers.length === 10) {
        break;
      }
    }
  }
  // Return the borrowers array created earlier
  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
