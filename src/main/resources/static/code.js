// "use strict";
//


document.getElementById("add-new").addEventListener("click", function () {
    document.getElementById("row-add").classList.toggle("row-hidden");
    document.querySelector("table").classList.toggle("fix-empty");
});
var indexList = 0;
var index = 0;

function addUser() {
    // Get value input
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;

    //Create tr
    var trHTML = ' <tr  style="height: 20px"> ' +
        '<td scope="col" width="50px" style="text-align: center">' + ++indexList + '</td> ' +
        '<td>' + name + '</td>' +
        '<td style="text-align: center">' + age + '</td>' +
        '<td width="100px">' +
        '<a class="edit edit-' + indexList + '" onclick="oneEdit(this)" title="Edit" data-toggle="tooltip"><i class="material-icons">&#xE254;</i></a>' +
        '<a class="delete delete-' + indexList + '" onclick="oneDel(this)" title="Delete"><i class="material-icons">&#xE872;</i></a></td></tr>' +
        '<a class="add-none add-' + indexList + '" onclick="oneAdd(this)" title="Add" data-toggle="tooltip"><i class="material-icons">&#xE03B;</i></a>';

    $('#listUser').append(trHTML);

    // Hide form add new
    document.getElementById("row-add").classList.toggle("row-hidden");
    document.querySelector("table").classList.toggle("fix-empty");

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