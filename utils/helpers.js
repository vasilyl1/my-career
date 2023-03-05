module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  first: (array) => {
    return array && array[0];
  },
  toBoolean: (value) => {
    if (value === 'true' || value === true) {
      return true;
    } else {
      return false;
    }
  }
};