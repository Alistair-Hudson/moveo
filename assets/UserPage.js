$(function(){
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    $.ajax({
        url: 'https://randomuser.me/api/?'+queries[1]+'&'+queries[2]+'&'+queries[3],
        dataType: 'json',
        success: function (data){
            onSuccess(data, queries[4]);
        }
    })
});
function onSuccess(data, element){
    var result = data.results[element];
    // initMap(-25, 131);//location.coordinates.latitude, location.coordinates.latitude);
    rowData("<img src= " + result.picture.thumbnail+"/>", "")
    rowData("Name", result.name.first + " " + result.name.last);
    rowData("Email", "<a href= 'mailto: " + result.email + "'>" + result.email + "</a>");
    rowData("Gender", result.gender);
    rowData("Age", result.dob.age);
    var location = result.location;
    var address = location.street.number + " " + location.street.name + " " + location.city + " " + location.state;
    rowData("Address", address);
    // address = address.replace(/ /g, "+");
    generateMap(location.coordinates.latitude, location.coordinates.longitude);
    
}
function rowData(heading, data){
    var row = $("#tblDetails tr:last-child").removeAttr("style").clone(true);
    $("th", row).eq(0).html(heading);
    $("td", row).eq(0).html(data);   
    $("#tblDetails").append(row);
}
function generateMap(lat, lng){
    var ifrm = document.createElement("iframe");
    ifrm.setAttribute("src", "https://www.google.com/maps/embed/v1/place?key=AIzaSyCSa8BYtIZMElFgkhYo2f7YCfT27F-ifE0&q=" + lat + "," + lng);
    ifrm.style.width = "640px";
    ifrm.style.height = "480px";
    document.body.appendChild(ifrm);
}