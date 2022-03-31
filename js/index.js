let users;

$().ready( () => {
    console.log("jquery is ready!");

    let url1 = "http://localhost:43788/api/users"
    let url2 = "http://localhost:43788/api/vendors"
    let url3 = "http://localhost:43788/api/products"
    let url4 = "http://localhost:43788/api/requests"
    let url5 = "http://localhost:43788/api/requestlines"

    $.getJSON(url1)
        .then(
            (resp) => { 
                console.debug(resp);
                users = resp; 
                display(users);
            }
        )
        .fail(
            (err) => { console.error(err); }
        );
});

const display = (users) => {
    let tbody = $("#users")
    tbody.empty();
    for( let user of users) {
        let tr = $("<tr></tr>");
        let tdId = $(`<td>${user.id}</td>`);
        tr.append(tdId);
        let tdName = $(`<td>${user.firstname} ${user.lastname}</td>`);
        tr.append(tdName);
        let tdUname = $(`<td>${user.username}</td>`);
        tr.append(tdUname);
        let tdPhone = $(`<td>${user.phone}</td>`);
        tr.append(tdPhone);
        let tdEmail = $(`<td>${user.email}</td>`);
        tr.append(tdEmail);
        let tdReviewer = $(`<td>${(user.isReviewer ? "Yes" : "No")}</td>`);
        tr.append(tdReviewer);
        let tdAdmin = $(`<td>${(user.isAdmin ? "Yes" : "No")}</td>`);
        tr.append(tdAdmin);
        let tdActions = $(`<td><a href="detail.html?id=${user.id}">Detail</a> | <a href="change.html?id=${user.id}">Edit</a></td>`);
        tr.append(tdActions);
        tbody.append(tr);
    }   
}