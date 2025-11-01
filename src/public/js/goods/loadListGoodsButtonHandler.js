var userId = document.cookie.split("=")[1];

var loadListGoodsButtonHandler = async () => {
  document.getElementById("load-list-goods").addEventListener("click", async (e) => {
    e.preventDefault();

    var res = await fetch("/goods", {
      method: "POST",
      body: JSON.stringify({ userId }),
      headers: { "content-type": "application/json" },
    });

    if (!res.ok) {
      var { msg } = await res.json();
      alert(msg);
      return;
    }

    var { listGoods } = await res.json();

    return { listGoods };
  });
};
