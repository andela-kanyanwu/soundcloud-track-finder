var trackFinder = {
  initialize: function() {
    console.log("initialized");
    this.api();
  },
  api: function() {
    var url = "https://api.soundcloud.com/tracks?client_id=dfe6c7a24917b01e30400444842a6de4"
    $.getJSON(url, function(reply) {
      console.log("response: ",reply);
      for (var i = 0; i < reply.length; i++) {
        console.log("Track-id: ", reply[i].id);
        console.log("Genre: ", reply[i].genre);
        console.log("title: ", reply[i].title);
        console.log("Name of song: ", reply[i].permalink);
        console.log("Stream URL: ", reply[i].stream_url);
        console.log("Avatar URL: ", reply[i].user.avatar_url);
      }
    });
  }
}
$(document).ready(trackFinder.initialize())