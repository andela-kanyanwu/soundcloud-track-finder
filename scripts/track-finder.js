var trackFinder = {
  initialize: function() {
    console.log("initialized");
    this.search();
  },
  search: function() {
    $("#search").click(function() {
      var input = $("#textBox").val().trim();

      //Checks for spaces and replaces them with a hyphen
      for (var i = 0; i < input.length; i++) {
        input = input.replace(" ", "-");
      }          

      var url = "https://api.soundcloud.com/tracks/"+ input + "?client_id=dfe6c7a24917b01e30400444842a6de4";
      $.getJSON(url, function(reply) {       
        var streamUrl =  reply.stream_url + "?client_id=dfe6c7a24917b01e30400444842a6de4"; 
        console.log("main stream url: ", streamUrl);
        console.log("response: ",reply); 
        console.log("artwork url: ", reply.artwork_url);
        console.log("Downloadable: ", reply.downloadable);
        console.log("Title: ", reply.title);
        console.log("Stream url: ", reply.stream_url);
        $("#audio").append('<source src="' + streamUrl + '"type="audio/mpeg">');
      });
    });    
  }
}
$(document).ready(trackFinder.initialize())

