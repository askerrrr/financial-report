var flashElement = (el) => {
  if (!el) return;

  el.classList.remove("flash");
  void el.offsetWidth;
  
  el.classList.add("flash");
  el.addEventListener(
    "animationend",
    () => {
      el.classList.remove("flash");
    },
    { once: true },
  );
};

export default flashElement;
