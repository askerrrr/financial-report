var changeElementInArray = async (items, { index, value, fieldName }) => {
  var item = items[index];

  item[fieldName] = value;

  items[index] = item;

  return items;
};

module.exports = changeElementInArray;
