$(document).ready(function () {

    var currentDay = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);

    var currentHour = dayjs().hour();
});