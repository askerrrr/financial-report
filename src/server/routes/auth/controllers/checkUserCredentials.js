var checkUserCredentials = async (req, res, next) => {
  try {
    var userData = req.body;

    console.log("userData: ", userData);

    return res.status(200).json({ redirectUrl: "/" });
  } catch (e) {
    next(e);
  }
};

module.exports = checkUserCredentials;
