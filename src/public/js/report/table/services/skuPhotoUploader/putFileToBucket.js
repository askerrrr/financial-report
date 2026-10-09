var putFileToBucket = async (url, file) => {
  var res = await fetch(url, {
    body: file,
    method: "PUT",
    headers: { "Content-Type": file.type },
  }).catch(() => false);

  return { success: res.ok };
};

export default putFileToBucket;
