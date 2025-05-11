var uploadFile = async () =>
  document
    .getElementById("upload-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      var input = document.getElementById("upload-input");

      console.log("input.files.length", input.files.length);

      if (!input.files.length) {
        return alert("select file");
      }

      var formData = new FormData();

      for (var file of input.files) {
        formData.append("xlsx", file); //
      }

      var res = await fetch("/upload", {
        body: formData,
        method: "POST",
      });

      if (!res.ok) {
        return alert("err");
      }

      var data = await res.json();

      console.log(data);
    });

uploadFile().catch((e) => console.log("e: ", e));
