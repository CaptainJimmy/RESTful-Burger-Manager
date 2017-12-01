$(document).ready(function() {

    function burgerReDraw(method) {
        console.log("REDRAW!!!")
        $.ajax({
            type: "GET",
            url: "/eaten"
        }).then(data => {
            console.log("eaten1")
            var burgers = $('#eaten-burgers > tbody');
            burgers.empty();
            data.forEach(child => {
                var newRow = $('<tr>')
                newRow.append(
                    $('<td>').text(child.burger_name),
                    $('<td>').text(child.user_created),
                    $('<td>').text(child.created_at),
                    $('<td>').text(child.updated_at),
                    $('<button>').addClass("btn btn-default deleteBurger").attr({ "data-value": child.id }).append(
                        $('<i>').addClass("fa fa-window-close").attr({ "aria-hidden": "true" })
                    )
                )
                burgers.append(newRow);
                console.log("eaten2")

            })
        }).then(function() {
            $.ajax({
                type: "GET",
                url: "/noteaten"
            }).then(data => {
                console.log("noteaten1")
                var notEatenBurger = $('#not-eaten-burgers > tbody');
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
                            $('<i>').addClass("fa fa-heart")
                            .attr({ "aria-hidden": "true" })
                        )
                    )
                    console.log("foo");
                    notEatenBurger.append(newNotEatenRow);
                })
                console.log("noteaten2")
            })
        })
        switch (method) {
            case "deleted":
                $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Deleted")
                break;
            case "eat":
                $('#messages').addClass("active").removeClass("hidden").text("Burger Successfully Eaten")
        }
    }

    $(document).on("click", ".eatIt", function(event) {
        event.preventDefault();
        var eatTheBurgerID = $(this).attr('data-value');
        console.log(eatTheBurgerID);
        if (eatTheBurgerID) {
            var path = '/eatburger/' + eatTheBurgerID;
            $.ajax({
                type: "put",
                url: path
            }).done((data) => {
                $('#messages').text("Ate that burger!");
                burgerReDraw("eat");
            })
        }
    });
    $(document).on("click", ".deleteBurger", function(event) {
        event.preventDefault();
        console.log("DERPY")
        var deleteBurgerID = $(this).attr('data-value');
        console.log(deleteBurgerID)
        var derpypath = '/delete/' + deleteBurgerID
        $.ajax({
                type: "DELETE",
                url: derpypath
            }).done((data) => {
                burgerReDraw("deleted")
            })
            .catch((err) => {
                $('#messages').text(err)
            })

    });


});