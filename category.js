const { normalizeString } = require('./common');

const extractCategory = (talkCategory, categories) => {

  const category = categories.find(category => category.id === talkCategory);
  if (!category) {
    throw new Error(`Cannot find category ${talkCategory}`);
  }
  return `tags:
  - '${normalizeString(category.name)}'
`;
};

module.exports = {
  extractCategory,
};
