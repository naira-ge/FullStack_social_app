const PostSchema = require("../models/post/Post.schema");
const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/errorHandler");

exports.getAllPostSchemas = asyncHandler(async (req, res, next) => {
  let query;

  let uiValues = {
    filtering: {},
    sorting: {},
  };

  const reqQuery = { ...req.query };

  const removeFields = ["sort"];

  removeFields.forEach((val) => delete reqQuery[val]);

  const filterKeys = Object.keys(reqQuery);
  const filterValues = Object.values(reqQuery);

  filterKeys.forEach(
    (val, idx) => (uiValues.filtering[val] = filterValues[idx])
  );

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = PostSchema.find(JSON.parse(queryStr));

  if (req.query.sort) {
    const sortByArr = req.query.sort.split(",");

    sortByArr.forEach((val) => {
      let order;

      if (val[0] === "-") {
        order = "descending";
      } else {
        order = "ascending";
      }

      uiValues.sorting[val.replace("-", "")] = order;
    });

    const sortByStr = sortByArr.join(" ");

    query = query.sort(sortByStr);
  } else {
    query = query.sort("-price");
  }

  const posts = await query;

  const maxUp = await PostSchema.find()
    .sort({ price: -1 })
    .limit(1)
    .select("-_id price");

  const minPrice = await PostSchema.find()
    .sort({ price: 1 })
    .limit(1)
    .select("-_id price");

  uiValues.maxUp = maxUp[0].price;
  uiValues.minPrice = minPrice[0].price;

  res.status(200).json({
    success: true,
    data: posts,
    uiValues,
  });
});

