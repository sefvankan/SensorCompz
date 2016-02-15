var socket = new WebSocket('ws://echo.websocket.org');

socket.onmessage = function(evt){
alert("I got data: " + evt.data)
}