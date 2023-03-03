module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  first: (array) => {
    return array && array[0];
  }
};
