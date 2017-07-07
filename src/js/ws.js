// USER ID FOR STATUS TO SERVER SIDE WITH SOCKET io
var socket = io();

socket.on("connect", function(msg){

  console.log("socket ON",msg);

});