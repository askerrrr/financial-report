import { DatabaseError } from "../../../../customError/index.js";

var projectQueries = ["listGoods.id", "listGoods.skuName", "listGoods.metrics"];

var getListGoodsFromDb = async (collection, userId, skuNames, session) => {
  var data;
  var sessionOption = session ? { session } : {};

  try {
    if (Array.isArray(skuNames) && skuNames.length) {
      var projectFields = {};

      projectQueries.map((field) => {
        var key = field.split(".")[1];
        projectFields[key] = "$$r." + key;
      });

      data = await collection.aggregate([
        { $match: { userId, "listGoods.skuName": { $in: skuNames } } },
        {
          $project: {
            listGoods: {
              $map: {
                input: {
                  $filter: {
                    input: "$listGoods",
                    cond: { $in: ["$$this.skuName", skuNames] },
                  },
                },
                as: "r",
                in: projectFields,
              },
            },
          },
          // ...sessionOption,
        },
      ]);

      return { listGoods: data[0].listGoods };
    } else {
      data = await collection.findOne({ userId }, null, { ...sessionOption });

      return { listGoods: data.listGoods.toObject() };
    }
  } catch (e) {
    console.log(e);
    throw new DatabaseError(userId, 500, e);
  }
};

export default getListGoodsFromDb;
