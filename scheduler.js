$(document).ready(function () {

    setInterval(function() {
        var currentDay = dayjs().format("dddd, MMMM D, YYYY h:mm:ss A");
        $("#currentDay").text(currentDay);
    }, 300);

    var currentHour = dayjs().hour();

    // Loop through time blocks compare with currentHour and set class based on 
    // current hour block
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
            textarea.val(text);
            textarea.attr("disabled", true);
        }
    });

    //save entry to local storage and disable the text area once saved
    $(".saveBtn").on("click", function() {
        
        var savedConf = $("header").children("#saved-entry");
        var textarea = $(this).siblings(".description").children("textarea");
        var parent = $(this).parent(); // get the parent element
        var time = parent.attr("id"); // get the id attribute of the parent element
        if (textarea.val() === '') {
            localStorage.removeItem(time);
            alert("There is nothing to save");
            async function reloadfix() {
                console.log("Alert shown");
                await new Promise((delay) => {
                    const intervalId = setInterval(() => {
                        const alert = window.alert;
                        if (alert) {
                        clearInterval(intervalId);
                        console.log("alert dismissed");
                        delay();
                        }
                    },500);
                });
            location.reload();
            console.log("page reloaded");
            }
            // Call function to wait for 
            reloadfix();
            

        }   else if (textarea.prop("disabled")) {
            savedConf.css("display", "none")
            alert("Please click the edit button and make changes before saving.");
        }   else {
            savedConf.css("display", "block")
            var time = $(this).parent().attr("id");
            var text = $(this).siblings(".description").children("textarea").val().trim();
            localStorage.setItem(time, text);
        }
        //remove confirmation message from display
        setTimeout (() => {
            savedConf.css("display", "none");
        }, 1000);
        //disable textarea for text entry
        $(this).siblings(".description").children("textarea").attr("disabled", true); // add disabled attribute to textarea;
    });
    
    //allow editing of a saved entry.
    $(".editBtn").on("click", function() {
        var textarea = $(this).siblings(".description").find("textarea");
        textarea.prop("disabled", false);
    })

});    


