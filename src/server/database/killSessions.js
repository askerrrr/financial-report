var killSessions = async (dbClient, sessionIds = []) => {
  await dbClient.db.command({ killSessions: sessionIds });
};

export default killSessions;
