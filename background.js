$('p').click(function() {
    if ($(this).attr("previous-color") === undefined) {
        $(this).attr("previous-color", $(this).css("color"));
        $(this).css("color", "#988AE3");
    } else {
        $(this).css("color", $(this).attr("previous-color"));
        $(this).removeAttr("previous-color");
    }
});