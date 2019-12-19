const { normalizeString } = require('./common');

const extractCategory = (talkCategory, categories) => `tags:
  - '${normalizeString(categories.find(category => category.id === talkCategory).name)}'
`;

module.exports = {
  extractCategory,
};
