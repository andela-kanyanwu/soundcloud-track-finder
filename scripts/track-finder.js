var trackFinder = {
  initialize: function() {
    this.search();
    $("#error").hide();
    this.playSong();
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
  songIndex: 1,

  //Get the tracks available
  getSongs: function() {    
    var input = $("#textBox").val().trim();    

    //Checks for spaces and replaces them with a hyphen
    for (var i = 0; i < input.length; i++) {
      input = input.replace(" ", "-");
    }     
    
    var url = "https://api.soundcloud.com/tracks?q="+ input + "&client_id=dfe6c7a24917b01e30400444842a6de4";
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

          var divCol = '<div class="col-xs-6 col-md-2">',
              divThum = '<div class="thumbnail thumbnail-image">',
              p = '<p>',
              img = '<img class="artwork" src=' + artworkUrl + '>',
              button = '<button class="play-song">Play</button>';


          //Displays images and embeds the song url in it to make it clickabl
          $("#result").append('<div class="col-xs-6 col-md-2">' + '<div class="thumbnail thumbnail-image"><p>' + title + '</p><p>' + username +'</p><img class="artwork" src=' + artworkUrl + '><button class="play-song">Play</button>' + '<div style="display:none">' + streamUrl + '</div></div></div>'); 
        }
      }
      $("#audio").trigger('load');
      $("#audio").html('<source src="' + songArray[0] + '"type="audio/mpeg">');

      //Get the index of the song and increment when one song ends in order to go to the next
      trackFinder.onSongEnded();

      if ($("#result").html().length === 0) {
        $("#error").html("No search found").show();
        $("#result").hide();
      }      
    });
  },

  //When the song playing ends, move to the next
  onSongEnded: function() {
    var songArray = trackFinder.songArray;
    var songIndex = trackFinder.songIndex;
    
    audio.addEventListener('ended', function() {
      $("#audio").html('<source src="' + songArray[songIndex] + '"type="audio/mpeg">'); 
      $("#audio").load();
      $("#audio").trigger('play');
      console.log("audio.addEventListener", songArray[songIndex], songIndex);
      songIndex ++;        
    });
  },

  playSong: function() {
    $("#result").on("click", "button", function(){
      var currSongUrl = $(this).next().html(),
          currSongIndex = trackFinder.songArray.indexOf(currSongUrl);

      $("#audio").html('<source src="' + currSongUrl + '"type="audio/mpeg">');
      $("#audio").trigger('load');
      $("#audio").trigger('play');
      trackFinder.songIndex = currSongIndex;
      console.log("playSong method", trackFinder.songIndex);
    });   
  }   
}

$(document).ready(trackFinder.initialize())


