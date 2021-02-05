const manageErrors = (err) => {
  err.errors.forEach(e => {
    if(e.type === 'notNull Violation'){
      e.message = 'notNull'
    }
    if (e.type === 'unique violation') {
      e.message = "unique";
    }
  });
}

module.exports = manageErrors;