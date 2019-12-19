const normalizeString = str => str.replace(/[\W_]+/g, '_').toLocaleLowerCase();

module.exports = {
  normalizeString,
};
