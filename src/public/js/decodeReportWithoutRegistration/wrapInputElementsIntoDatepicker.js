var dateFromInput = document.getElementById("dateFrom");
var dateToInput = document.getElementById("dateTo");

var wrapInputElementsIntoDatepicker = () => {
  new Datepicker(dateFromInput, {
    language: "ru",
    format: "yyyy-mm-dd",
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isMonday = date.getDay() === 1;

      return {
        enabled: isMonday,
      };
    },
  });

  new Datepicker(dateToInput, {
    language: "ru",
    format: "yyyy-mm-dd",
    autoFocus: false,
    todayHighlight: false,
    beforeShowDay: (date) => {
      var isSunday = date.getDay() === 0;

      return {
        enabled: isSunday,
      };
    },
  });
};

export default wrapInputElementsIntoDatepicker;
