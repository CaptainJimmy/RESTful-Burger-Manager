$(document).ready(function() {
    // reusable code after every submit or interaction with the api
    function burgerReDraw(method) {
        //get the eaten burgers
        $.ajax({
                type: "GET",
                url: "/burger/api/eaten"
            }).then(data => {
                //prepare re-render the table body
                var burgers = $('#eaten-burgers > tbody');
                //empty the body
                burgers.empty();
                data.forEach(child => {
                        var newRow = $('<tr>')
                        newRow.append(
                                $('<td>').text(child.burger_name),
                                $('<td>').text(child.user_created),
                                $('<td>').text(child.created_at),
                                $('<td>').text(child.updated_at),
                                $('<button>').addClass("btn btn-default deleteBurger").attr({ "data-value": child.id }).append(
                                    $('<i>').addClass("fa fa-window-close deleteBurger").attr({ "aria-hidden": "true", "data-value": child.id })
                                )
                            )
                            // send the new row to the div
                        burgers.append(newRow);
                    })
                    // get the not eaten burgers
            }).then(function() {
                $.ajax({
                    type: "GET",
                    url: "/burger/api/noteaten"
                }).then(data => {
                    //prepare re-render the table body
                    var notEatenBurger = $('#not-eaten-burgers > tbody');
                    //empty the body
                    notEatenBurger.empty();
                    data.forEach(child => {
                        var newNotEatenRow = $('<tr>')
                        newNotEatenRow.append(
                                $('<td>').text(child.burger_name),
                                $('<td>').text(child.user_created),
                                $('<td>').text(child.created_at),
                                $('<button>').addClass("btn btn-default eatIt")
                                .attr({
                                    "data-value": child.id,
                                    type: "submit"
                                }).append(
                                    $('<i>').addClass("fa fa-heart eatIt")
                                    .attr({ "aria-hidden": "true", "data-value": child.id })
                                )
                            )
                            //send the new row to the div
                        notEatenBurger.append(newNotEatenRow);
                    })
                })
            })
            // switch case to update the message
        switch (method) {
            case "deleted":
                $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Deleted")
                break;
            case "eat":
                $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Eaten")
                break;
            case "submit":
                $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Submitted")
        }
    }
    // listeners 
    // eat a burger
    $(document).on("click", ".eatIt", function(event) {
        event.preventDefault();
        var eatTheBurgerID = $(this).attr('data-value');
        if (eatTheBurgerID) {
            var path = '/burger/api/eatburger/' + eatTheBurgerID;
            $.ajax({
                    type: "put",
                    url: path
                }).done((data) => {
                    $('#messages').text("Ate that burger!");
                    burgerReDraw("eat");
                })
                .catch((err) => {
                    console.log(err)
                    $('#messages').text(err)
                })
        }
    });
    // delete a burger
    $(document).on("click", ".deleteBurger", function(event) {
        event.preventDefault();
        var deleteBurgerID = $(this).attr('data-value');
        var derpypath = '/burger/api/delete/' + deleteBurgerID
        $.ajax({
                type: "DELETE",
                url: derpypath
            }).done((data) => {
                burgerReDraw("deleted")
            })
            .catch((err) => {
                console.log(err)
                $('#messages').text(err)
            })

    });
    // add a burger
    $(document).on("click", ".addBurger", function(event) {
        event.preventDefault();
	    //console.log($('#username').val().trim(), $('#add-burger').val().trim())
	    var userCreated=$('#username').val().trim();
	    var burgerName=$('#add-burger').val().trim();
        $(this).closest('form').find("input[type=text], textarea").val("");
        $.ajax({
                url: "/burger/api/add",
                type: "POST",
                data: {
                    "user_created": userCreated,
                    "burger_name": burgerName
                }
            }).then((data) => {
                burgerReDraw("submit")
            })
            .catch((err) => {
                console.log(err)
                $('#messages').text(err)
            })
    });
});
