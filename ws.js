(function () {

  var CBot_WebSocket = null;
  var CBot_Temp;
  var CBot_Sensors;

  function WebSocketMessage(e) {
    var message = e.data.toString();
    var list = message.split(':');

    if (list.length != 3) return;

    document.getElementsByClassName('ik_rr')[0].innerText = list[2];
    document.getElementsByClassName('ik_ll')[0].innerText = list[1];
    document.getElementsByClassName('uzz')[0].innerText = list[0];
  }

  function WebSocketOpen(e) {
    CBot_WebSocket = CBot_Temp;

    CBot_Sensors = setInterval(function () {
      CBot_WebSocket.send('D');
    }, 100);

    document.getElementById('host_ip').readOnly = true;
    document.getElementById('host_ip').style.backgroundColor = "#7fff7f";
  }

  function WebSocketClose(e) {
    clearInterval(CBot_Sensors);
    CBot_WebSocket = null;
    document.getElementById('host_ip').readOnly = false;
    document.getElementById('host_ip').style.backgroundColor = "#ff7f7f";
    WebSocketConnect();
  }

  function WebSocketConnect() {
    setTimeout(function (hostname, object) {

      var host = document.getElementById('host_ip').value;
      try {
        CBot_Temp = new WebSocket('ws://' + host + '/ctrl');
      } catch (e) {
        WebSocketConnect();
        return;
      }

      CBot_Temp.onopen = WebSocketOpen;
      CBot_Temp.onmessage = WebSocketMessage;
      CBot_Temp.onclose = WebSocketClose;

    }, 500);
  }

  function cbot_speed(dir) {
    var s = document.getElementsByClassName('period-select')[0].value * 10;
    if (dir == 'U') return 'M:' + (+s) + ':' + (+s);
    if (dir == 'D') return 'M:' + (-s) + ':' + (-s);
    if (dir == 'L') return 'M:' + (-s) + ':' + (+s);
    if (dir == 'R') return 'M:' + (+s) + ':' + (-s);
  }

  function Init_Events() {

    document.getElementsByClassName('robot_task_window')[0].innerHTML =
      '<p style="display:inline; margin:3px 3px 3px 20px">IP:</p><input id="host_ip" style="margin: 3px 3px 3px 10px; width:100px; background-color: rgba(221, 212, 212, 0.5)" type="text" value="192.168.4.1" />';



    document.getElementsByClassName('arrowUp')[0].addEventListener("mousedown", function () {
      if (CBot_WebSocket) CBot_WebSocket.send(cbot_speed('U'));
    });

    document.getElementsByClassName('arrowLeft')[0].addEventListener("mousedown", function () {
      if (CBot_WebSocket) CBot_WebSocket.send(cbot_speed('L'));
    });

    document.getElementsByClassName('arrowRight')[0].addEventListener("mousedown", function () {
      if (CBot_WebSocket) CBot_WebSocket.send(cbot_speed('R'));
    });

    document.getElementsByClassName('arrowDown')[0].addEventListener("mousedown", function () {
      if (CBot_WebSocket) CBot_WebSocket.send(cbot_speed('D'));
    });

    document.getElementsByClassName('stop')[0].addEventListener("mousedown", function () {
      if (CBot_WebSocket) CBot_WebSocket.send('B:200:100');
    });

    function Stop() {
      if (CBot_WebSocket) CBot_WebSocket.send('STOP');
    }

    document.getElementsByClassName('arrowUp')[0].addEventListener("mouseup", Stop);
    document.getElementsByClassName('arrowLeft')[0].addEventListener("mouseup", Stop);
    document.getElementsByClassName('arrowRight')[0].addEventListener("mouseup", Stop);
    document.getElementsByClassName('arrowDown')[0].addEventListener("mouseup", Stop);
    document.getElementsByClassName('stop')[0].addEventListener("mouseup", Stop);

  }

  setTimeout(Init_Events, 500);

  WebSocketConnect();

})();