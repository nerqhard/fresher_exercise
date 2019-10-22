// "use strict";
//

var indexList = 0;
var index = 0;

document.getElementById("add-new").addEventListener("click", function () {
    document.getElementById("row-add").classList.toggle("row-hidden");
    document.querySelector("table").classList.toggle("fix-empty");
});

function addUser() {
    // Get value input
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;

    $.ajax({
        url: '/api/addUser',
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({
            name: name,
            age: age
        })
    }).done(function (data) {

        // Hide form add new
        document.getElementById("row-add").classList.toggle("row-hidden");
        document.querySelector("table").classList.toggle("fix-empty");

        $(".table tbody tr").remove();
        // var trHTML;
        // var i=0;
        $.each(data, function (i, item) {
            // i++;
            var nameDt = item.name;
            var ageDt = item.age;

            var trHTML = ' <tr  style="height: 20px" data-id ="'+  item.id +'">' +
                '<td scope="col" width="50px" style="text-align: center">' + ++i + '</td> ' +
                '<td>' + nameDt + '</td>' +
                '<td style="text-align: center">' + ageDt + '</td>' +
                '<td width="100px">' +
                '<a th:href="@{/crud/editUser/{id}(id=${user.id})}" class="edit" title="Edit" data-toggle="tooltip">' +
                '<i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete fixIcon" title="Delete" data-toggle="modal" onclick="confirmDelete(this)"><i class="material-icons">&#xE872;</i></a>'
            ;
            $('#listUser').append(trHTML);
        })
        var formNew = '<tr id="row-add" style="text-align: center" class="row-hidden">' +
            '<td width="60px"> <i class="text-success" style="text-align: center; font-size: 12px !important">' +
            '<b>New</b></i> </td> <td>' +
            ' <input class="form-control form-control-sm" type="text" name="name" id="name"placeholder="Your name.." style="padding: 5px"/><br/> </td>' +
            ' <td> <input class="form-control form-control-sm" type="text" name="age" id="age"placeholder="Your age.." style="padding: 5px" value=""/> </td>' +
            ' <td><a class="add" title="Add" onclick="addUser()"data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a></td></tr>';

        $('#listUser').append(formNew);
    });
};

function oneDel(e) {
    $("." + e.classList[1]).closest('tr').remove();
}

function oneEdit(e) {
    index = e.classList[1];

    $("." + e.classList[1]).closest("tr").find("td:not(:first)").each(function (u) {

        $(this).html('<input type="text" class="form-control" value="' + $(this).text() + '">');
        if (u == 2) {
            $(this).html('<a class="add ' + index + '" title="Update" onclick="updateUser(this)"data-toggle="tooltip"><i  class="material-icons">&#xE03B;</i></a>'
            )
        }
    });
}

function updateUser(e) {
    // console.log(e.classList);
    $("." + index).closest("tr").find("td").each(function (u) {
        console.log(u)
        $(this).html($(this).find('input[type="text"]').val());
        if (u == 3) {
            $(this).html('<a class="edit edit-' + indexList + '" onclick="oneEdit(this)" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
                '<a class="delete delete-' + indexList + '" onclick="oneDel(this)" title="Delete"><i class="material-icons">&#xE872;</i></a></td></tr>'
            )
        }
    });
}

function confirmDelete(e) {
    $('#myConfirm').find(".btn-danger").attr("data-id", $("." + e.classList[1]).closest('tr').attr("data-id"));
    $('#myConfirm').modal('toggle');
}

$("#accessDelete").click(function () {
    var id = $(this).attr("data-id");

    $.ajax({
        url: '/api/deleteUser/' + id,
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {

        // Hide form add new
        document.getElementById("row-add").classList.toggle("row-hidden");
        document.querySelector("table").classList.toggle("fix-empty");

        $(".table tbody tr").remove();
        // var trHTML;
        // var i=0;
        $.each(data, function (i, item) {
            // i++;
            var nameDt = item.name;
            var ageDt = item.age;

            var trHTML = ' <tr  style="height: 20px"> ' +
                '<td scope="col" width="50px" style="text-align: center">' + ++i + '</td> ' +
                '<td>' + nameDt + '</td>' +
                '<td style="text-align: center">' + ageDt + '</td>' +
                '<td width="100px">' +
                '<a href="/crud/editUser/' + item.id + '" class="edit" title="Edit" data-toggle="tooltip">' +
                '<i class="material-icons">&#xE254;</i> </a>' +
                '<a class="delete fixIcon" title="Delete" data-toggle="modal" onclick="confirmDelete(this)"><i class="material-icons">&#xE872;</i></a>'
            ;
            $('#listUser').append(trHTML);
        })
        var formNew = '<tr id="row-add" style="text-align: center" class="row-hidden">' +
            '<td width="60px"> <i class="text-success" style="text-align: center; font-size: 12px !important">' +
            '<b>New</b></i> </td> <td>' +
            ' <input class="form-control form-control-sm" type="text" name="name" id="name"placeholder="Your name.." style="padding: 5px"/><br/> </td>' +
            ' <td> <input class="form-control form-control-sm" type="text" name="age" id="age"placeholder="Your age.." style="padding: 5px" value=""/> </td>' +
            ' <td><a class="add" title="Add" onclick="addUser()"data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a></td></tr>';

        $('#listUser').append(formNew);
        $('#myConfirm').modal('toggle');
    });
})