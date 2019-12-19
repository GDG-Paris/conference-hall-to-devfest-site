const extractFormat = (talkFormat, formats) => `format: ${formats.find(format => format.id === talkFormat).name}`;

module.exports = {
  extractFormat,
};
