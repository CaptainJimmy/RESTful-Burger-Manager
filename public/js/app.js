$(document).ready(function() {

    function burgerReDraw(data, method) {
        var burgers = $('#eaten-burgers > tbody');
        burgers.empty();
        data.isEaten.forEach(child => {
            var newRow = $('<tr>')
            newRow.append(
                $('<td>').text(child.burger_name),
                $('<td>').text(child.user_created),
                $('<td>').text(child.created_at),
                $('<td>').text(child.updated_at),
                $('<button>').addClass("btn btn-default deleteBurger").append(
                    $('<i>').addClass("fa fa-window-close").attr({
                        "aria-hidden": "true",
                        "data-value": child.id
                    }))
            )

            burgers.append(newRow);
        })
        var notEatenBurger = $('#not-eaten-burgers > tbody');
        data.notEaten.forEach(child => {
            var newNotEatenRow = $('<tr>');
            newNotEatenRow.append(
                $('<td>').text(child.burger_name),
                $('<td>').text(child.user_created),
                $('<td>').text(child.created_at)
            )
            notEatenBurger.html(newNotEatenRow);

            switch (method) {
                case "deleted":
                    $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Deleted")
                    break;
                case "eat":
                    $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Eaten")
            }
        })
    }

    $(".eatIt").on("click", function(event) {
        event.preventDefault();
        var eatTheBurgerID = $(this).attr('data-value');
        console.log(eatTheBurgerID);
        if (eatTheBurgerID) {
            var path = '/eatburger/' + eatTheBurgerID;
            $.ajax({
                type: "put",
                url: path
            }).done((data) => {
                alert("Ate that burger!");
                burgerReDraw(data, "eat");
            })
        }
    });
    $(document).on("click", ".deleteBurger", function(event) {
        event.preventDefault();
        var deleteBurgerID = $(this).attr('data-value');
        var derpypath = '/' + deleteBurgerID
        $.ajax({
                type: "delete",
                url: derpypath
            }).done((data) => {
                burgerReDraw(data, "deleted")
            })
            //.catch((err) => {
            //$('#messages').text(err)
            //})

    });


});