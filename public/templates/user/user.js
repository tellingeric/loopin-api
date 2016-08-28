var xmlhttp = new XMLHttpRequest();
var url = "/login";

xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        var myArr = JSON.parse(xmlhttp.responseText);
    }
};

xmlhttp.open("POST", "/login", true);
xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xmlhttp.send();



function Redirect_Login() {
  window.location.assign("/index.html");
  return false;
}
