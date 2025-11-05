var peekWeekDaysHandler = async () => {
  var checkedCheckboxes = [...document.querySelectorAll("input[type=checkbox]:checked")]
    .map(({ id }) => id)
    .map(Number);

  if (!checkedCheckboxes.length) {
    return { checkedWeekDays: [7] };
  }

  if (checkedCheckboxes.length > 1 && checkedCheckboxes.includes(7)) {
    return { checkedWeekDays: [7] };
  }

  return { checkedWeekDays: checkedCheckboxes };
};

export default peekWeekDaysHandler;
