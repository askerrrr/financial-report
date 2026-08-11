var updateReportsTree = async (collection, userId, years, session) => {
  var sessionOptions = session ? { session } : {};

  var result = await collection.updateOne(
    { userId },
    {
      $set: { years: years },
    },
    {
      ...sessionOptions,
    },
  );

  return result.modifiedCount;
};
export default updateReportsTree;
