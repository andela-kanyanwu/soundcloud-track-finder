var trackFinder = {
  initialize: function() {
    console.log("initialized");
    this.search();
  },
  search: function() {
    $("#search").click(function() {
      var input = $("#textBox").val().trim();
      https://api.soundcloud.com/tracks/wake-me-up?client_id=dfe6c7a24917b01e30400444842a6de4
      var url = "https://api.soundcloud.com/tracks/"+ input + "?client_id=dfe6c7a24917b01e30400444842a6de4"
      $.getJSON(url, function(reply) {
        console.log("response: ",reply); 
        console.log("artwork url: ", reply.artwork_url);
        console.log("Downloadable: ", reply.downloadable);
        console.log("Title: ", reply.title);
        console.log("Stream url: ", reply.stream_url);
      });
    });    
  }
}
$(document).ready(trackFinder.initialize())


// for (var i = 0; i < reply.length; i++) {
      //   console.log("Track-id: ", reply[i].id);
      //   console.log("Genre: ", reply[i].genre);
      //   console.log("title: ", reply[i].title);
      //   console.log("Stream URL: ", reply[i].stream_url);
      //   console.log("Avatar URL: ", reply[i].user.avatar_url);
      //   console.log("Username: ", reply[i].user.username);
      // }