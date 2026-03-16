var checkRoles = (roles) => {
  return (req, res, next) => {
    if (!roles?.includes(req.payload.role)) {
      return res.sendStatus(403);
    }

    next();
  };
};

module.exports = checkRoles;
