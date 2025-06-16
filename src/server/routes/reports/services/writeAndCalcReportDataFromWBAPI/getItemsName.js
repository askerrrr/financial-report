var getItemsName = async (data) => {
  var items = data.filter(
    (e) => e.doc_type_name == "Продажа" && e.supplier_oper_name == "Продажа"
  );

  var itemsName = items.map((e) => e.sa_name);

  var result = [];

  for (var name of itemsName) {
    if (!result.includes(name)) {
      result.push(name);
    }
  }

  return result;
};

module.exports = getItemsName;
