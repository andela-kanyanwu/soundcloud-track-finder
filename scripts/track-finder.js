var trackFinder = {
  initialize: function() {
    this.search();
    this.clickImg();
    $("#error").hide();
  },
  search: function() {
    $("#search").click(function() {
      event.preventDefault(); 
      trackFinder.songArray = [];
      trackFinder.imgArray = [];
      $("#result").empty();
      $("#result").show();
      $("#error").hide();
      $("#audio").html('<source src="' + ""+ '"type="audio/mpeg">');
      $("#audio").trigger('load');
      trackFinder.getSongs();      
    });    
  },

  songArray: [],
  imgArray: [],

  //Get the tracks available
  getSongs: function() {    
    var input = $("#textBox").val().trim();    

    //Checks for spaces and replaces them with a hyphen
    for (var i = 0; i < input.length; i++) {
      input = input.replace(" ", "-");
    }     
    
    var url = "https://api.soundcloud.com/tracks?q="+ input + "&client_id=dfe6c7a24917b01e30400444842a6de4";
    //var songArray = [];
    var songArray = trackFinder.songArray,
        imgArray = trackFinder.imgArray;

    $.getJSON(url, function(reply) { 
      
      for (var i = 0; i < reply.length; i++) {
        //check if song is streamable. If it is not, media player won't play it
        if (reply[i].streamable === true) {
          var streamUrl = reply[i].stream_url + "?client_id=dfe6c7a24917b01e30400444842a6de4",
              title = reply[i].title,
              artworkUrl = reply[i].artwork_url || "images/soundcloud-icon.png",
              username = reply[i].user.username;
          
          //Push the songs in the song array
          songArray.push(streamUrl);
          imgArray.push(artworkUrl);
       
          //Displays images and embeds the song url in it to make it clickabl
          $("#result").append('<div class="col-xs-6 col-md-2">' + '<div class="thumbnail thumbnail-image"><p>' + title + '</p><p>' + username +'</p><img class="artwork" src=' + artworkUrl + '></div></div>'); 
        }
      }
      $("#audio").trigger('load');
      $("#audio").html('<source src="' + songArray[0] + '"type="audio/mpeg">');

      //Get the index of the song and increment when one song ends in order to go to the next
      var songIndex = 1;
      audio.addEventListener('ended', function() {
        $("#audio").html('<source src="' + songArray[songIndex] + '"type="audio/mpeg">'); 
        $("#audio").load();
        $("#audio").trigger('play');
        songIndex ++;        
      });
      
      if ($("#result").html().length === 0) {
        $("#error").html("No search found").show();
        $("#result").hide();
      }      
    });
  },
  clickImg: function() {
    $(".songLink").on('click', function(){
      alert ("Clicked");
    });
  }   
}

$(document).ready(trackFinder.initialize())


