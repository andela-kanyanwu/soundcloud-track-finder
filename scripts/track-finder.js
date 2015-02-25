var trackFinder = {
  initialize: function() {
    this.search();
    $("#error").hide();
  },
  search: function() {
    $("#search").click(function() {
      event.preventDefault(); 
       $("#result").empty();
       $("#error").hide();
      var input = $("#textBox").val().trim();
    

      //Checks for spaces and replaces them with a hyphen
      for (var i = 0; i < input.length; i++) {
        input = input.replace(" ", "-");
      }          

      var url = "https://api.soundcloud.com/tracks?q="+ input + "&client_id=dfe6c7a24917b01e30400444842a6de4";
      $.getJSON(url, function(reply) {       
      
        for (var i = 0; i < reply.length; i++) {
          //check if song is streamable. If it is not, media player won't play it
          if (reply[i].streamable === true) {
            var streamUrl = reply[i].stream_url + "?client_id=dfe6c7a24917b01e30400444842a6de4",
                title = reply[i].title,
                artworkUrl = reply[i].artwork_url;

            $("#result").append("<ul>" + "<li>" +  title + "</li>" + "<li>" + artworkUrl + "</li>" + "</ul>");          
            $("#audio").append('<source src="' + streamUrl + '"type="audio/mpeg">');        
          }
        }
        // if ($("#result").html === "") {
        //   $("#error").html("No search found");
        //   $("#result").hide();
        // }
        
      });
    });    
  }
}
$(document).ready(trackFinder.initialize())


