var updateItems = async (collection, userId, reportId, items) => {
  var result = await collection.updateOne(
    { userId, "reports.id": reportId },
    {
      $set: {
        "reports.$.items": items,
      },
    }
  );

  return result.modifiedCount;
};

module.exports = updateItems;
