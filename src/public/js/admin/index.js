var url = "/admin/api";

var getMainPageData = async () => {
  var res = await fetch(url);

  var { users } = await res.json();
  return { users };
};

var main = async () => {
  var { users } = await getMainPageData();
  console.log(users);
};

main();
