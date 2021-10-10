$(function () {
    $('#pagination').pagination({
        dataSource: 'https://randomuser.me/api/?seed=1',
        locator: 'results',
        totalNumber: 120,  
        pageSize: 10,
        autoHidePrevious: true,
        autoHideNext: true,
        alias: {
            pageNumber: 'page',
            pageSize: 'results'
        },
        callback: function(data, pagination) {
            onSuccess(data, pagination.pageNumber);
        }
    })
});
function onSuccess(data, pageNumber){
    var row = $("#tblUsers tr:last-child").removeAttr("style").clone(true);
    $("#tblUsers tr").not($("#tblUsers tr:first-child")).remove();
    for (var i = 0; i < data.length; ++i){
        var result = data[i];
        $("td", row).eq(0).html("<img src= " + result.picture.thumbnail+"/>");
        $("td", row).eq(1).html("<a href= 'UserPage.html?" + result.login.username + "&seed=1&page="+pageNumber+"&results=10&"+i+"'>" + result.name.first[0] + " " + result.name.last + "</a>");
        $("td", row).eq(2).html("<a href= 'mailto: " + result.email + "'>" + result.email + "</a>");
        $("td", row).eq(3).html(result.gender);
        $("td", row).eq(4).html(result.dob.age);
        $("#tblUsers").append(row);
        row = $("#tblUsers tr:last-child").clone(true);
    };
}