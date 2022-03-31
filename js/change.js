let user; 
let parms;

$().ready(() => {
    console.debug("Ready!");

    parms = getUrlParms();
    console.debug("Parms:", parms);
    display(parms.id);

    $("#get").on("click", () => {
        let id = $("#xId").val();
        display(id);
    });

    $("#save").on("click", () => {
        save();
    });

    $("#delete").on("click", () => {
        remove();
    })
});

const display = (id) => {
    $.getJSON("http://localhost:43788/api/users/" + id)
        .then((res) => {
            user = res;
            console.debug(res);
            $("#iId").val(user.id);
            $("#iUsername").val(user.username);
            $("#iFirstname").val(user.firstname);
            $("#iLastname").val(user.lastname);
            $("#iPhone").val(user.phone);
            $("#iEmail").val(user.email);
            $("#iReviewer").prop("checked", user.isReviewer);
            $("#iAdmin").prop("checked", user.isAdmin);
        })
        .fail((err) => { console.error(err); });
}

const save = () => {
    let user = {
        id: +$("#iId").val(),
        username: $("#iUsername").val(),
        password: "Train@MAX",
        firstname: $("#iFirstname").val(),
        lastname: $("#iLastname").val(),
        phone: $("#iPhone").val(),
        email: $("#iEmail").val(),
        isReviewer: $("#iReviewer").prop("checked"),
        isAdmin: $("#iAdmin").prop("checked")
    }
    console.debug(user);
    $.ajax({
        url: "http://localhost:43788/api/users/" + user.id,
        method: "PUT",
        data: JSON.stringify(user),
        contentType: "application/json"
    })
        .then((res) => { 
            console.log(res); 
            document.location.href = "index.html";
        })
        .fail((err) => { console.error(err); });
}

const remove = () => {
    $.ajax({
        method: "DELETE",
        url: "http://localhost:43788/api/users/" + user.id
    })
        .then((res) => {
            console.debug("Delete response:", res);
            document.location.href = "index.html";
        })
        .fail((err) => {
            console.error("ERROR response:", err);
        });
}