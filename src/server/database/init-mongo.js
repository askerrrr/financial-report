db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME,
  passwd: process.env.MONGO_INITDB_ROOT_PASSWORD,
  roles: [{ role: "root", db: "admin" }],
});
