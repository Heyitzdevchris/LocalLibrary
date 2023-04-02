function findAccountById(accounts, id) {
  // Loop through the accounts array
  for ( let accountIndex in accounts) {
     // Get the current account object
    let currentAccount = accounts[accountIndex];
     // If the current account's id matches the given id, return it
    if ( currentAccount.id === id ) {
      return currentAccount;
    }
  }
  return null;
}

function sortAccountsByLastName(accounts) {
  // Create a copy of the accounts array to avoid modifying the original array
  let sortedAccounts = [...accounts];

  // Iterate over the sortedAccounts array using nested loops
  for (let i = 0; i < sortedAccounts.length; i++) {
    for (let j = i + 1; j < sortedAccounts.length; j++) {
      // Get the last name of the current and next account objects
      let lastNameA = sortedAccounts[i].name.last.toLowerCase();
      let lastNameB = sortedAccounts[j].name.last.toLowerCase();

      // If the last name of the next account object comes before the current one,
      // swap the positions of the two account objects
      if (lastNameA > lastNameB) {
        let temp = sortedAccounts[i];
        sortedAccounts[i] = sortedAccounts[j];
        sortedAccounts[j] = temp;
      }
    }
  }
  // Return the sorted array of account objects
  return sortedAccounts;
}

function getTotalNumberOfBorrows(account, books) {
  // Extract the account ID
  const accountId = account.id;
  // Initialize total borrows counter
  let totalBorrows = 0;

  // Loop through books array
  for (const book of books) {
    // Loop through the borrows of each book
    for (const borrow of book.borrows) {
      // If the 'Id' matches the accountId, increment the 'totalBorrows' counter
      if (borrow.id === accountId) {
        totalBorrows++;
      }
    }
  }
  // return the 'totalBorrows' counter
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  // establish an empty array
  const result = [];
  // Iterate through each book using a for/of loop
  for (let book of books) {
    // Create a simpler variable name for the loop index
    const borrow = book.borrows[0];
    // Check if the first borrow matches the account Id and has not been returned
    if (borrow.id === account.id && !borrow.returned) {
      // If it matches, us the find() method to loop up the author object for that book, and add it to the result array along with the book object.
      const author = authors.find(author => author.id === book.authorId);
      result.push({...book, author});
    }
  }
  // return the result array
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
