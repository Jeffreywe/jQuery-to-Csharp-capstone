let parms;

$().ready(() => {

    parms = getUrlParms();
    console.debug("Parms:", parms);

    $("#refresh").on("click", () => {
        refresh();
    })

    $("#delete").on("click", () => {
        remove();
    })

    refresh();

});

const refresh = () => {
    let id = parms.id;
    $.getJSON(`http://localhost:43788/api/users/${id}`)
        .then((res) => { 
            console.debug(res); 
            display(res);
        })
        .fail((err) => { 
            console.error(err); 
        }); 
}

const remove = () => {
    let id = parms.id;
    $.ajax({
        method: "DELETE",
        url: `http://localhost:43788/api/users/${id}`
    })
        .then((res) => {
            console.debug("Delete response:", res);
            document.location.href = "index.html";
        })
        .fail((err) => {
            console.error("ERROR response:", err);
        });
}

const display = (user) => {
    $("#dId").text(user.id);
    $("#dName").text(`${user.firstname} ${user.lastname}`);
    $("#dUsername").text(user.username);
    $("#dPhone").text(user.phone);
    $("#dEmail").text(user.email);
    $("#dReviewer").text(user.isReviewer ? "Yes" : "No");
    $("#dAdmin").text(user.isAdmin ? "Yes" : "No");
}