$(document).ready(function() {
    $("#postComment").click(function() {
        var myobj = {
            Name: $("#name").val(),
            Comment: $("#comment").val()
        };
        var jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "comment";
        $.ajax({
            url: url,
            type: "POST",
            data: jobj,
            contentType: "application/json; charset=utf-8",
            success: function(data, textStatus) {
		$("#done").html("Good One!");
		var everything = "<ul>";
		var com = data[comment];
		everything += "<li> " + $("#name").val() + " <br> - " + $("#comment").val() + "</li>";
                $("#comments").html(everything);
		
            }
        })

    });
    $("#getComments").click(function() {
        $.getJSON('comment', function(data) {
            console.log(data);
            var everything = "<ul>";
            for (var comment in data) {
                com = data[comment];
                everything += "<li> " + com.Name + " <br> - " + com.Comment + "</li>";
            }
            everything += "</ul>";
            $("#comments").html(everything);
        })
    })
    $("#deleteComments").click(function() {
        var url = "delete";
        $.ajax({
            url: url,
            type: "POST",
            data: "",
            success: function(data, textStatus) {
                $("#done").html(textStatus);
            }
        })
    });
});