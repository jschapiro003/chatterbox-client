var settings = {
  url: "https://api.parse.com/1/classes/chatterbox"
};

var app = {
  init: function() {
    this.fetch();
    $("form").on("submit", function (el) {

      var $inputs = $('form :input');
      var inputMessage = {};

      $inputs.each(function() {
        inputMessage[this.name] = $(this).val();
      });
      var message = {
        username: inputMessage["username"],
        text: inputMessage["text"],
        roomname:inputMessage["roomname"]
      };
      app.send(message);
      // app.send(message);
      return false;
    });
  },
  rooms: [],
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: settings.url,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message');
      }
    });
  },
  fetch: function() {
    var rooms = [];
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: settings.url,
      type: 'GET',
      contentType: 'application/json',
      success: function(data) {
        _.each(data.results,function(result){
          console.log(result)
            rooms.push(result.roomname);
            $(".chat").append('<div><p class="username">' + result.username + ': ' + '</p><span class="messageText">' + result.text + '</span></div>');
        });
        app.rooms = _.uniq(rooms);
        var select = $("select");
        _.each(app.rooms, function (room) {
          select.append($('<option value="' + room + '">' + room + '</option>'));
        });

      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message');
      }
    });
  }
};