$(document).ready(function () {

    var currentDay = dayjs().format("dddd, MMMM D, YYYY");
    $("#currentDay").text(currentDay);

    var currentHour = dayjs().hour();

    //Loop through time blocks and set class based on current hour block
    $(".time-block").each(function() {
        var blockHour = parseInt($(this).attr("id").split("-")[1]);
        if (blockHour < currentHour) {
            $(this).addClass("past");
            $(this).find("textarea").addClass("past")
        } else if (blockHour === currentHour) {
            $(this).addClass("present");
            $(this).find("textarea").addClass("present");
        } else {
            $(this).addClass("future");
            $(this).find("textarea").addClass("future");
        }
    })
});


