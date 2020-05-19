(function () {

  var PY_WebSocket;

  function WebSocketMessage(e) {
    var message = e.data.toString();
    if (message == "N/A") {
      document.getElementsByClassName('video')[0].innerHTML = '';
      return;
    }

    var img = "<img src='images/sign/" + message + "'></img>";

    document.getElementsByClassName('video')[0].innerHTML = img;
  }

  function WebSocketOpen(e) {

  }

  function WebSocketClose(e) {
    WebSocketConnect();
  }

  function WebSocketConnect() {
    setTimeout(function (hostname, object) {

      try {
        PY_WebSocket = new WebSocket('ws://localhost:9001');
      } catch (e) {
        WebSocketConnect();
        return;
      }

      PY_WebSocket.onopen = WebSocketOpen;
      PY_WebSocket.onmessage = WebSocketMessage;
      PY_WebSocket.onclose = WebSocketClose;

    }, 500);
  }

  WebSocketConnect();
})();