module.exports = {
  formatDate: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  formatTime: (timestamp) => {
    const date = new Date(timestamp);
    const timeString = date.toLocaleTimeString();
    return timeString;
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
  },
  formatLine: (line) => {// cuts the string for preview
    return line.slice(0,150);
  }
};