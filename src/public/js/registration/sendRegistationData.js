var sendRegistationData = async (data) => {
  var res = await fetch("/reg/new", {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export default sendRegistationData;
