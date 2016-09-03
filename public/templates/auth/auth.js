// $( document ).ready(function() {
//     $("#loginForm").submit(function(e){
//         e.preventDefault();
//         // send ajax
//         $.ajax({
//             url: '/login', // url where to submit the request
//             type : "POST", // type of action POST || GET
//             dataType : 'json', // data type
//             data : $("#loginForm").serializeJSON(), // post data || get data
//             success : function(result) {
//                 // you can see the result from the console
//                 // tab of the developer tools
//                 //console.log(result);
//                 window.localStorage.setItem("loopin.access-token", result.token);
//                 Redirect_Login();
//
//             },
//             error: function(xhr, resp, text) {
//                 console.log(xhr, resp, text);
//             }
//         });
//
//     });
// });
//
//
//
//
//
// function Redirect_Login() {
//   window.location.assign("/index.html");
//   return false;
// }
