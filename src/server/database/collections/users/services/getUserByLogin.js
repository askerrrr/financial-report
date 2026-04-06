var getUserByLogin = async (collection, login, session) => await collection.findOne({ login }, null, session);

export default getUserByLogin;
