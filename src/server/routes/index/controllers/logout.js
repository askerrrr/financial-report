var logout = (req, res, next) => res.clearCookie("token").redirect("/");

export default logout;
