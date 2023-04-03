$(document).ready(function () {

    var currentDay = dayjs().format("dddd, MMMM D, YYYY h:mm A");
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
    });

    //Load any saved entries from local storage
    $(".time-block").each(function() {
        var time = $(this).attr("id");
        var text = localStorage.getItem(time);
        var textarea = $(this).children(".description").children("textarea");
        
        if (text) {
            textarea.val(text)
            textarea.attr("disabled", true)
        }
    });

    //save entry to local storage and disable the text area once saved
    $(".saveBtn").on("click", function() {
        
        var savedConf = $("header").children("#saved-entry");
        var textarea = $(this).siblings(".description").children("textarea");
        if (textarea.prop("disabled")) {
            savedConf.css("display", "none")
            alert("Please click the edit button and make changes before saving.");
        }   else if (textarea.val() === '') {
            alert("There is nothing to save")
        }   else {
            savedConf.css("display", "block")
            var time = $(this).parent().attr("id");
            var text = $(this).siblings(".description").children("textarea").val().trim();
            localStorage.setItem(time, text);
        }

        
        setTimeout (() => {
            savedConf.css("display", "none");
        }, 1000);

   

        $(this).siblings(".description").children("textarea").attr("disabled", true); // add disabled attribute to textarea;
    });
    //allow editing of a saved entry.
    $(".editBtn").on("click", function() {
        var textarea = $(this).siblings(".description").find("textarea");
        textarea.prop("disabled", false);
    })

});    


