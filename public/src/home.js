function getTotalBooksCount(books) {
  // Create a counter variable equal to zero
  let totalBooks = 0;

  // Iterate through the books object array using a for/loop
  for (let i = 0; i < books.length; i++) {
    // For each book in the array, add one to the total variable
    totalBooks++;
  }
  // Return total variable amount
  return totalBooks;
}

function getTotalAccountsCount(accounts) {
  // Create a counter variable equal to zero
  let totalAccounts = 0;

  // Iterate through the books object array using a for/loop
  for (let i = 0; i < accounts.length; i++) {
    // For each account in the array, add one to the totalAccounts variable
    totalAccounts++;
  }
  // Return totalAccounts variable amount
  return totalAccounts;
}


function getBooksBorrowedCount(books) {
  // Use the filter() method to check all books inside the borrows object is returned or not
  return books.filter(books => !books.borrows[0].returned).length;
}

function getMostCommonGenres(books) {
  // Count the number of times each genre appears in the provided books array
  const genreCount = books.reduce((acc, book) => {
    if (acc[book.genre]) {
      acc[book.genre]++;
    }
    else {
      acc[book.genre] = 1;
    }
    return acc;
  }, {});

  // Sort the genres by their count, from most common to least common
  const genres = Object.keys(genreCount).map((name) => ({
    name,
    count: genreCount[name],
  }));
  genres.sort((a, b) => b.count - a.count);

  // Return an array with up to five genre objects, each containing the genre name and count using the slice() method
  return genres.slice(0, 5);
}

function getMostPopularBooks(books) {
  // Create an array of object containing book title and borrow count
  const bookCounts = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }));

  // Sort the array in the descending order by borrow count
  bookCounts.sort((book1, book2) => book2.count - book1.count);

  // Return the top 5 most popular books
  return bookCounts.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // Create an object to group the books by author ID
  const booksByAuthor = books.reduce((acc, book) => {
  const authorId = book.authorId;
    if (!acc[authorId]) {
      acc[authorId] = [];
    }
    acc[authorId].push(book);
    return acc;
  }, {});
  
  // Sum up the number of borrows for all of the books by each author
  const authorBorrows = [];
  authors.forEach(author => {
    const authorId = author.id;
    const authorBooks = booksByAuthor[authorId] || [];
    const borrows = authorBooks.reduce((acc, book) => {
      const bookBorrows = book.borrows.length;
      return acc + bookBorrows;
    }, 0);
    authorBorrows.push({ name: `${author.name.first} ${author.name.last}`, count: borrows });
  });
  
  // Sort the authors by the number of times their books have been borrowed
  authorBorrows.sort((a, b) => b.count - a.count);
  
  // Return only the top five authors
  return authorBorrows.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
